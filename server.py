#! /usr/bin/env python3
import cherrypy
import os
import configparser
import json

from python_scripts.database import Database
from python_scripts.game import Game

class Server():
    '''
        Server Configuration:
    '''

    database = None
    game_registry = []

    def __init__(self, configuration):
        """ Initialization the URL of the comic and transcript """

        self.app_url = configuration['app_url']
        self.database = Database(configuration['database_uri'])
        #fill registry with matches
        #cron job to update registry
        #unique id is date time  YYYYMMDDHHMM


    @cherrypy.expose
    def login(self):
        """ gets the user login info and return as valid or not """

        import hashlib
        login_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        # check if user exists
        user_record = self.database.get_data( 'login', { 'username': login_info['username'] } )
        if user_record is None: # user not found
            return json.dumps( {"status": "failed", "message": "user not found in the database"} )
        else:
            entered_password = hashlib.md5( login_info['password'].encode() ).hexdigest()
            if user_record['password'] != entered_password:
                return json.dumps( {"status": "failed", "message": "password incorrect"} )
        return json.dumps( {"status": "sucess", "message": "valid"} )
        # if user sexists get the pass and hash it
        # compare the hash with one in database


    #@cherrypy.expose  call manually for now
    def signup(self, username, password):
        """ gets the user login info and return as valid or not """

        import hashlib
        # check if user exists
        user_record = self.database.get_data( 'login', { 'username': username } )
        if user_record is None: # user not found
            password = hashlib.md5( password.encode() ).hexdigest()
            self.database.insert( "login", { "username": username, "password": password } )
            return {"status": "sucess", "message": "user created"}
        else:
            return {"status": "failed", "message": "user already exists"}


    @cherrypy.expose
    def register_game(self, game_info):
        """ Returns the GameId for the registered game
        all requests come in using the gameId refer the README for the json structure"""

        new_game = Game( game_info.game_type, self.database )
        new_game.register( game_info )
        game_id = len( game_registry )
        self.game_registry.append( new_game )
        return json.dumps( { code: "sucess", game_id: game_id } )


    @cherrypy.expose
    def update_game(self, game_id, game_data):
        """ Return the count of no of comics """

        Game = self.game_registry[game_id]
        result = Game.update( game_data )
        #TODO: define action on faliure
        return json.dumps( { code: result, game_id: game_id  } )


    @cherrypy.expose
    def score_board(self, game_id ):
        """ Return the count of no of comics """

        Game = self.game_registry[game_id]
        Game.score_board()
        #return the sucess or failiure with appropiate data


    @cherrypy.expose
    def get_game_list(self, game_type):
        """ Return the count of no of comics """

        #from the game registry for depecific date
        #return a map for game and their perticulars with their game id



if __name__ == '__main__':
    ''' Setting up the Server with Specified Configuration'''

    server_config = configparser.RawConfigParser()
    conf = {
        '/': {
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/resources': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './resources'
        }
    }
    server_config.read('server.conf')
    server_port = server_config.get('Server', 'port')
    server_host = server_config.get('Server', 'host')
    app_url = server_config.get('app_url', 'url')
    database_uri = server_config.get('Database', 'database_uri')
    configuration = {
        'app_url': app_url,
        'database_uri': database_uri
    }
    cherrypy.config.update({'server.socket_host': server_host})
    cherrypy.config.update({'server.socket_port': int(
        os.environ.get('PORT', server_port)
    )})
    cherrypy.quickstart(Server(configuration), '/', conf)
