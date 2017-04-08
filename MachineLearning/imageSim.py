import argparse
from os import listdir
from json import dumps, dump
from os.path import join, dirname
from os import environ
from watson_developer_cloud import VisualRecognitionV3

api_key = '765736dbfb9d4bcf1824ac87be85c107bcc2275f'
visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)


def getImages():
	for file_name in listdir('img/'):
		try:
			img_file_name = 'img/' + file_name
			with open(img_file_name, 'r') as image_file:
				result = visual_recognition.classify(images_file=image_file)
				# dump out to file with the specific identifier
				with open('classified/' + file_name.split('.')[0]+'_raw.json', 'w') as json_file:
					dump(result, json_file, indent=4)
				with open('classified/' + file_name.split('.')[0] + '_proc.txt', 'w') as json_file:
					shortenedResult = {}
					b = result['images'][0]['classifiers'][0]['classes']
					listOfAnnotations = []
					for classification in b:
						listOfAnnotations.append(classification['class'])
					json_file.write(' '.join(listOfAnnotations))
				with open('classified/' + file_name.split('.')[0] + '_score.txt', 'w') as json_file:
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
		except Exception, e:
			print e

if __name__ == '__main__':
	getImages()

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