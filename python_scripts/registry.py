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

    def populate(self):
        """ assigns a unique key to the existind game """

        self.database.get_data('CRICKET', {})

    def get_list(self, game_type, date):
        """ returns games with ids """

        projection = {
            "_id": 0,
            "unique_id": 1,
            "date": 1,
            "time": 1,
            "venue": 1,
            "description": 1,
            "game_type": 1,
            "teams": 1,
            "attributes": 0
        }
        list_of_objects = self.database.get_data(game_type, {"date": date}, projection)

        return {'objects': list_of_objects}
