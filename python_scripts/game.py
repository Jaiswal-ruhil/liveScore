
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

    def __init__( self, game_type, database, enrol ):
        """ Initialization """
        """ registers the game in the database  and genereates the database id """

        self.game_type = game_type
        self.database = database
        self.update = GameInteractions.update[game_type]


    def register( self, registeration_data ):
        """ stores the registeration data on the database """

        import datetimes
        registeration_data['unique_id'] = '{:%Y%m%d%H%M%S%s}'.format(datetime.datetime.now())
        self.database_id = self.database.insert( self.game_type, registeration_data )
        if self.database_id is None:
            return { 'status' : 'failed', 'message': 'could not make a entry in data base'}
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
