
#! /usr/bin/env python3

from python_scripts import game_interactions

class Game():
    """
    config the object functions according to the game
    """

    Database = None
    database_id = None
    game_type = None
    game_data = None
    register = None

    def __init__( self, game_type, database ):
        """ Initialization the URL of the comic and transcript """

        self.game_type = game_type
        self.Database = database
        self.register = GameInteractions.register[game_type]
        self.update = GameInteractions.update[game_type]

    def register( self, registeration_data ):
        """ registers the game in the database  and genereates the database id """

        self.database_id = self.register( self.Database, registeration_data )
        return False if self.database is None else True


    def update( self, game_data ):
        """ updates the database with incoming data based on the game """

        self.database_id = self.update[game_type]( self.Database, game_data )
        return False if self.database is None else True


    def score_board( self ):
       """ return the score board for the game """

       self.database_id = self.update[game_type]( self.Database, game_data )
       return False if self.database is None else True
