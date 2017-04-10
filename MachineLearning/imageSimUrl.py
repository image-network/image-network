import os
import sys
import argparse
from os import listdir, chdir
from json import dumps, dump
from os.path import join, dirname
from os import environ
from watson_developer_cloud import VisualRecognitionV3
import argparse

api_key = '86f5d20959e6fe2dccf75285dd2157b07be91c70'
visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)


def getImage(user_id, image_id, image_url):
	result = visual_recognition.classify(images_url=image_url)
	# dump out to file with the specific identifier
	with open('classified/' + user_id + '|' + image_id +'_raw.json', 'w') as json_file:
		dump(result, json_file, indent=4)
	with open('classified/' + user_id + '|' + image_id + '_proc.txt', 'w') as json_file:
		shortenedResult = {}
		b = result['images'][0]['classifiers'][0]['classes']
		listOfAnnotations = []
		for classification in b:
			listOfAnnotations.append(classification['class'])
		json_file.write(' '.join(listOfAnnotations))
	with open('classified/' + user_id + '|' + image_id + '_score.txt', 'w') as json_file:
		shortenedResult = {}
		b = result['images'][0]['classifiers'][0]['classes']
		listOfAnnotations = []
		for classification in b:
			listOfAnnotations.append(classification['class'])
			listOfAnnotations.append(str(classification['score']))
		outputStr = ""
		for i in xrange(0, len(listOfAnnotations), 2):
			outputStr += listOfAnnotations[i] + " " + listOfAnnotations[i+1] + "\n"
		json_file.write(outputStr)

if __name__ == '__main__':
	# print dirname(__file__)
	parser = argparse.ArgumentParser()                                               
	parser.add_argument("--userId", "-ud", type=str, required=True)
	parser.add_argument("--imageId", "-imd", type=str, required=True)
	parser.add_argument("--imageUrl", "-imu", type=str, required=True)
	args = parser.parse_args()
	os.chdir(sys.path[0])
	getImage(args.userId, args.imageId, args.imageUrl)

"""

1st idea: I'm thinking naively initialize one node in the center of a 2D grid 
and other nodes the specific distance away. Then, just use calculus and update 
x and y values with respect to minimizing the square of the differences 
between node distances and what we want them to be.

http://iamtrask.github.io/2015/07/12/basic-python-network/

2nd idea: Treat each node as center of mass, position the nodes around it 
in evenly split angels. If 3 nodes are connected, each 120 degree around
that node and then put their distances off. Now move to the next
node and do the same for all of its connections, for any adjustments, adjust
with an average or something
"""