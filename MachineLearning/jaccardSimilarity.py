import os
import sys
from os import listdir
from json import dump
import numpy as np
import random
import math

""" Extracts relevant information from the classified images creates a
	dictionary of image id to string classification:
	string_dict = {"car": 'car railcar vehicle sedan', 'bike': 'bike orange tire metal'}

	Then calls string_network function
"""
def getAnnotations():
	string_dict = {}
	for annotation in [file for file in listdir('classified/') if 'proc' in file]:
		val = ""
		try:
			with open('classified/' + annotation, 'r') as proc_file:
				for line in proc_file:
					val += line
			string_dict[annotation.split('_')[0]] = val
		except Exception, e:
			print e
	string_network(string_dict)

""" Takes a dictionary of image id to strings and creates a 2D dictionary
	with edge relations containing jaccard similarities to other image strings
"""
def string_network(string_dict, threshold=0.09):
	network = {}
	for stringID in string_dict:
		s1 = string_dict[stringID]
		network[stringID] = {}
		for stringID2 in [stringID2 for stringID2 in string_dict if stringID2 != stringID]:
			s2 = string_dict[stringID2]
			similarityValue = jaccard_similarity(s1, s2)
			if similarityValue > threshold:
				network[stringID][stringID2] = similarityValue
	with open ('network.json', 'w') as json_file:
		dump(network, json_file, indent=4)
	generate_netgraph(network)


""" Number of common words shared divided by number of possible shared.

	Put the words in the smaller string into a hash set and then 
	simply iterate in n time through the words in the more wordy
	string checking if the words exist in the set.
	Divide common words by the number of words in the smaller set.
	Will take linear time because of constant time add for n elements and
	constant time contains for each of the n elements.
"""
def jaccard_similarity(s1, s2):
	words_S1 = s1.split(' ')
	words_S2 = s2.split(' ')
	count = 0.0
	if(len(words_S1) > len(words_S2)):
		mySet = set(words_S2)
		for word in [word for word in words_S1 if word in mySet]:
			count += 1
	else:
		mySet = set(words_S1)
		for word in [word for word in words_S2 if word in mySet]:
			count += 1
	return count/(len(words_S1)+len(words_S2)-count)

""" Generates the netgraph json to be rendered by Sigma
"""
def generate_netgraph(network):
	positions = generate_positions(network)
	netgraph = {}
	netgraph['nodes'] = []
	netgraph['edges'] = []
	edge_count = 'e0'
	for node in network:
		sub_node = {}
		sub_node['id']=node
		sub_node['label']=node
		sub_node['fname']="default"
		sub_node['lname']="default"
		sub_node['username']="default"
		sub_node['status']="default"
		sub_node['images']={}
		sub_node['profilePicture']=""
		sub_node['x']=positions[node][0]
		sub_node['y']=positions[node][1]
		sub_node['size']=1
		netgraph['nodes'].append(sub_node)
		for relation in network[node]:
			# if (network[node][relation]>0.1):
			new_edge = {}
			new_edge['id'] = edge_count
			edge_count = 'e' + str(int(edge_count[1:])+1)
			new_edge['source'] = node
			new_edge['target'] = relation
			netgraph['edges'].append(new_edge)
	with open('../WebContent/sigma-data/netgraph.json', 'w') as json_file:
	# with open('netgraph.json', 'w') as json_file:
		dump(netgraph, json_file, indent=4)


def generate_positions(network):
	positions = {}
	for node in network:
		positions[node] = [5, 5]

	for iteration in range(0, 50):
		for node in network:
			theta = 360/len(network[node])
			curr_angle = 0
			for relation in network[node]:
				dist = (1-network[node][relation])*10
				node2 = angle_distance_away(positions[node], dist, curr_angle)
				curr_angle += theta
				positions[relation] = weighted_average(positions[relation], node2, 0.5+iteration*0.01)
	return positions


def weighted_average(node1, node2, weight_on_first=0.5):
	return [node1[0]*weight_on_first + node2[0]*(1-weight_on_first), 
	node1[1]*weight_on_first + node2[1]*(1-weight_on_first)]

def angle_distance_away(node1, distance, theta):
	# x2 = x1 + r cos theta
	# y2 = y1 + r sin theta
	return [node1[0] + distance * math.sin(theta), 
	node1[1] + distance * math.cos(theta)]

def euclidean_dist(node1, node2):
	return np.sqrt((node1[0]-node2[0])**2 + (node2[1]-node2[1])**2)

# http://iamtrask.github.io/2015/07/12/basic-python-network/
# Trying to transform this problem into error minimization
def neural_network(a):
	X = np.array([ [0,0,1],[0,1,1],[1,0,1],[1,1,1] ])
	y = np.array([[0,1,1,0]]).T
	syn0 = 2*np.random.random((3,4)) - 1
	syn1 = 2*np.random.random((4,1)) - 1
	for j in xrange(60000):
		l1 = 1/(1+np.exp(-(np.dot(X,syn0))))
		l2 = 1/(1+np.exp(-(np.dot(l1,syn1))))
		l2_delta = (y - l2)*(l2*(1-l2))
		l1_delta = l2_delta.dot(syn1.T) * (l1 * (1-l1))
		syn1 += l1.T.dot(l2_delta)
		syn0 += X.T.dot(l1_delta)


def test_js():
	# switch to the actual unittest module
	unit_tests = [("Hello there", "Hello there", 1.0), ("Okay fine", "not available", 0.0)]
	for string1, string2, expected_output in unit_tests:
		assert jaccard_similarity(string1, string2) == expected_output

if __name__ == '__main__':
	# test_js()
	os.chdir(sys.path[0])
	getAnnotations()
