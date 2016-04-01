
import requests
import json

register_json = {
  "date": "01 04 2016",
  "time": "8:30",
  "venue": "zombiland",
  "description": "the game",

  "game_type": "BAsketball",
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
print(register_test.text)

get_list_json = {
  "game_type": "BAsketball"
}
get_list_url = "http://localhost:5050/get_game_list"
get_list_test = requests.post(get_list_url, json.dumps(get_list_json))
print(get_list_test.text)

update_json = {
  "game_id": "201604012334391459533879",
  "game_type": "BAsketball",
  "team_name": "102",
  "increment_score": "1",
  "increment_foul": "3",
  "increment_bonus": "5"
}
update_url = "http://localhost:5050/update_game"
update_test = requests.post(update_url, json.dumps(update_json))
print(update_test.text)

score_board_json = {
  "game_id": "201604012334391459533879",
  "game_type": "BAsketball",
 }
score_board_url = "http://localhost:5050/score_board"
score_board_test = requests.post(score_board_url, json.dumps(score_board_json))
print(score_board_test.text)
