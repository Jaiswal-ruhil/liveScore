#! /usr/bin/env python3

from python_scripts import game_interactions


class Game():
    """
    config the object functions according to the game
    """

    database = None
    database_id = None
    game_type = None
    game_data = None
    enrol = None

    def __init__(self, game_type, database, enrol):
        """ Initialization and regestration of the game
        in the database and genereates the database id """

        self.game_type = game_type
        self.database = database

    def register(self, registeration_data):
        """ stores the registeration data on the database """

        import datetime
        date = datetime.datetime.now()
        registeration_data['unique_id'] = '{:%Y%m%d%H%M%S%s}'.format(date)
        registeration_data['teams'] = []
        for team in registeration_data['attributes']['team_list']:
            registeration_data['teams'].append(team['name'])
        registeration_data['batting_team'] = registeration_data['teams'][0]
        team_list = registeration_data['attributes']['team_list']
        for team in team_list:
            team['score'] = 0
            team['wickets'] = 0
            team['ball'] = 0

        return self.database.insert(self.game_type, registeration_data)

    def update(self, game_info, update_data):
        """ updates the database with incoming data based on the game """

        score = update_data["increment_score_player"]+update_data["increment_score_extra"]
        wickets = update_data["increment_wicket"]
        ball = 0
        team_list = game_info['attributes']['team_list']
        for team in team_list:
            if(team["name"] == update_data["team_name"]):
                team['score'] = team['score']+int(score) if "score" in team else 0
                team['wickets'] = team['wickets']+int(score) if "wickets" in team else 0
                team['ball'] = team['ball']+int(score) if "ball" in team else 0

        selector = {"unique_id": game_info["unique_id"]}
        game_type = game_info["game_type"]
        return self.database.update(game_type, selector, game_info)

    def score_board(self, game_type, game_id):
        """ return the score board for the game """

        board = {
          "unique_id": game_id,
          "batting_team": "",
          "overs_completed": "",
          "current_socre": "",
          "current_wickets": ""
        }
        data = self.database.get_data(game_type, {"unique_id": game_id})
        board["batting_team"] = data["batting_team"]
        team_list = data['attributes']['team_list']
        board['team_list'] = data['teams']
        for team in team_list:
            if(team["name"] == data["batting_team"]):
                board['overs_completed'] = str(int(team['ball']/6))+"."+str(team['ball']%6)
                board['current_socre'] = team['score']
                board['current_wickets'] = team['wickets']
        return board
