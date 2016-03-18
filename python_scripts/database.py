#! /usr/bin/env python3
from pymongo import MongoClient


class Database():
    """
        Database Configuration:
        client -> MongoDb client.
        db -> Retrieve the Database.
        collection -> Retrieve the Collection.
    """

    client = ""
    db = ""

    def __init__(self, database_uri):
        """ Initialization the URL of the comic and transcript """

        try:
            self.client = MongoClient(database_uri)
            self.db = self.client.get_default_database()

        except:
            print("Error Could not Connect with the Database\n")
            print("Make sure connection can be estabilished.")
            exit(-1)

    def insert(self, collection, data):
        """ Insert the data into the Collection """

        return self.db[collection].insert(data)

    def get_data(self, collection, querry, projection=None):
        """ from the collection it returns the data"""

        if projection is None:
            projection = {'_id': 0}
        return self.db[collection].find_one(querry, projection)

    def get_game(self, game_id):
        """ Find comic details for specified comic id """

        return self.db[collection].find_one({"id": int(game_id)})

    def update(self, string, phrase=True, limit=10, skip=0):
        """ Find the string in the Database """

        #update here or remove and store
