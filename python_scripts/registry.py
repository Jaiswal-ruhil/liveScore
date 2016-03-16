#! /usr/bin/env python3

class Registry():
    """
    config the object functions according to the game
    """

    registry_list = None
    database = None

    def __init__( self, database ):
        """ Initialization """
        """ registers the game in the database  and genereates the database id """

        self.database = database


    def register( self, registeration_data ):
        """ stores the registeration data on the database """
        self.database_id = self.database.insert( self.game_type, registeration_data )
        if self.database_id is None:
            return { 'status' : 'failed', 'message': 'could not make a entry in data base'}
        self.enrol( registeration_data )
        return { 'status' : 'sucess', 'message': 'game is registered in database'}


    def update( self, game_data ):
        """ updates the database with incoming data based on the game """

        self.database_id = self.update[game_type]( self.Database, game_data )
        if self.database_id is None:
            return { 'status' : 'failed', 'message': 'could not make a entry in data base'}
        return { 'status' : 'sucess', 'message': 'game is registered in database'}


    def score_board( self ):
       """ return the score board for the game """

       self.database_id = self.update[game_type]( self.Database, game_data )
       data = self.database.get_data( { '_id': database_id }, { "_id": 0 } )
        if self.database_id is None:
            return { 'status' : 'failed', 'message': 'could not make a entry in data base'}
        return { 'status' : 'sucess', 'message': 'game is registered in database', 'data': data }
