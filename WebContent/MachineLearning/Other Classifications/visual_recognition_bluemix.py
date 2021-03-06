import json
from os.path import join, dirname
from os import environ
from watson_developer_cloud import VisualRecognitionV3

test_url = 'https://www.ibm.com/ibm/ginni/images' \
           '/ginni_bio_780x981_v4_03162016.jpg'
api_key = '765736dbfb9d4bcf1824ac87be85c107bcc2275f'

visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)

with open(join(dirname(__file__), 'img/car.jpg'), 'rb') as image_file:
    print(json.dumps(
        visual_recognition.classify(images_file=image_file, threshold=0.1,
                                    classifier_ids=['CarsvsTrucks_1479118188',
                                                    'default']), indent=2))

# print(json.dumps(visual_recognition.get_classifier('YOUR CLASSIFIER ID'),
# indent=2))

# with open(join(dirname(__file__), '../resources/car.jpg'), 'rb') as
# image_file:
#     print(json.dumps(visual_recognition.update_classifier(
# 'CarsvsTrucks_1479118188',
#
# cars_positive_examples=image_file), indent=2))

print(json.dumps(visual_recognition.classify(images_url=test_url), indent=2))

print(json.dumps(visual_recognition.detect_faces(images_url=test_url), indent=2))

# print(json.dumps(visual_recognition.delete_classifier(classifier_id='YOUR
# CLASSIFIER ID'), indent=2))

print(json.dumps(visual_recognition.list_classifiers(), indent=2))

with open(join(dirname(__file__), 'img/text.png'), 'rb') as image_file:
    print(json.dumps(visual_recognition.recognize_text(images_file=image_file), indent=2))

with open(join(dirname(__file__), 'resources/face.jpg'), 'rb') as image_file:
    print(json.dumps(visual_recognition.detect_faces(images_file=image_file), indent=2))

# with open(join(dirname(__file__), '../resources/face.jpg'), 'rb') as \
#     image_file:
# print(json.dumps(
#     visual_recognition.find_similar(collection_id="YOUR_COLLECTION_ID",
#                                     image_file=image_file),
#     indent=2))