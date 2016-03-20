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
        return self.database.insert(self.game_type, registeration_data)

    def update(self, game_info, update_data):
        """ updates the database with incoming data based on the game """

        score = update_data["increment_score_player"]+update_data["increment_score_extra"]
        wickets = update_data["increment_wicket"]
        ball = 0
        team_list = game_info['attributes']['team_list']
        for team in team_list:
            if(team["name"] == update_data["team_name"]):
                team['score'] = team['score']+score if "score" in team else 0
                team['wickets'] = team['wickets']+score if "wickets" in team else 0
                team['ball'] = team['ball']+score if "ball" in team else 0

        selector = {"unique_id": game_info["unique_id"]}
        game_type = game_info["game_type"]
        return self.database.update(game_type, selector, game_info)

    def score_board(self):
        """ return the score board for the game """

        self.database_id = self.update[game_type](self.Database, game_data)
        data = self.database.get_data({'_id': database_id}, {"_id": 0})
        if self.database_id is None:
            return {
                'status': 'failed',
                'message': 'could not make a entry in data base'}
        return {
            'status': 'sucess',
            'message': 'game is registered in database', 'data': data}
