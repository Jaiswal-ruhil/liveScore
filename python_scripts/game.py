#! /usr/bin/env python3

from python_scripts.game_interactions import register
from python_scripts.game_interactions import update
from python_scripts.game_interactions import score_board


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

        return register[registeration_data['game_type']](self.database, registeration_data)

    def update(self, game_info, update_data):
        """ updates the database with incoming data based on the game """

        return update[game_info['game_type']](self.database, game_info, update_data)

    def score_board(self, game_type, game_id):
        """ return the score board for the game """

        return score_board[game_type](self.database, game_id)
