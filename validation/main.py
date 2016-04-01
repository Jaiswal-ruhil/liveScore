
import requests
import json

signup_json = {"username": "ruhil", "password": "something"}
signup_url = "http://localhost:5050/signup"
signup_test = requests.post(signup_url, json.dumps(signup_json))
print(signup_test.text)


login_json = {"username": "ruhil", "password": "something"}
login_url = "http://localhost:5050/login"
login_test = requests.post(login_url, json.dumps(login_json))
print(login_test.text)
