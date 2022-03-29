from flask import Flask, request
import time
import json, requests
from uszipcode import SearchEngine


app = Flask(__name__)

@app.route('/population', methods= ['POST'])
def get_current_population():
	request_data = json.loads(request.data)
	fieldData = request_data['content']
	pig_latin_name= pig_latin(fieldData['fullname'])
	engine = SearchEngine()
	zipcode = engine.by_zipcode(fieldData['zip'])
	return {'population': zipcode.population if zipcode.population else 'No Record Found!!',  'name': pig_latin_name.capitalize() , 'major_city': zipcode.major_city}


def pig_latin(value):
	out= []
	if value:
		words= value.split()
		for word in words:
			out.append(word[1:]+'ay')
	return " ".join(out)
