
import requests

signup_json = {"username": "ruhil", "password": "something"}
signup_url = "http://localhost:5050/signup"
login_test = requests.post(signup_url, json.dumps(signup_json))

login_json = {"username": "ruhil", "password": "something"}
login_url = "http://localhost:5050/login"
login_test = requests.post(login_url, json.dumps(login_json))

register_json = {
  "date": "22 12 2016",
  "time": "8:30",
  "venue": "zombiland",
  "description": "the game",

  "game_type": "CRICKET",
  "attributes": {
    "overs": "10",
    "team_list": [
      {
        "name": "team101",
        "player_list": ["STRINGS"]
      },
      {
        "name": "102",
        "player_list": ["STRINGS"]
      }
    ]
  }
}
register_url = "http://localhost:5050/register_game"
register_test = requests.post(register_url, json.dumps(register_json))
