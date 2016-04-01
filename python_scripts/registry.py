#! /usr/bin/env python3

from python_scripts.game import Game


class Registry():
    """
    config the object functions according to the game
    """

    registry_list = None
    database = None

    def __init__(self, database):
        """ Initialization and registeration of
        the game in the database and genereates the database id """

        self.database = database

    def get_game(self, game_type, game_id):
        """ returns games with ids """

        return self.database.get_data(game_type, {"unique_id": game_id})

    def get_list(self, game_type, date):
        """ returns games with ids """

        projection = {
            "_id": 0,
            "attributes": 0
        }
        cursor_object = self.database.get_data_list(game_type, {"date": date}, projection)
        list_of_objects = list(cursor_object)
        return list_of_objects
