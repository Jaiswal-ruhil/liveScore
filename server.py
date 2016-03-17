#! /usr/bin/env python3
import cherrypy
import os
import configparser
import json

from python_scripts.database import Database
from python_scripts.registry import Registry
from python_scripts.game import Game

class Server():
    '''
        Server Configuration:
    '''

    database = None
    registry = None

    def __init__(self, configuration):
        """ Initialization the URL of the comic and transcript """

        self.app_url = configuration['app_url']
        self.database = Database(configuration['database_uri'])
        self.registry = Registry( self.database )
        self.registry.populate();
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
    def register_game(self):
        """ Returns the GameId for the registered game
        all requests come in using the gameId refer the README for the json structure"""

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        new_game = Game( game_info.game_type, self.database, self.registry );
        registeration_status = new_game.register( game_info ) #registers in the data base
        return json.dumps( registeration_status )


    @cherrypy.expose
    def update_game(self):
        """ Return the count of no of comics """

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        Game = self.registry.get_game( game_info['game_id'] )
        result = Game.update( game_info['game_data'] )
        return json.dumps( result )


    @cherrypy.expose
    def score_board(self, game_id ):
        """ Return the count of no of comics """

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        Game = self.registry.get_game( game_info['game_id'] )
        result = Game.score_board()
        return json.dumps( result )


    @cherrypy.expose
    def get_game_list(self, game_type):
        """ Return the count of no of comics """

        import datetime

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        self.registry.populate()
        current_date_day = "{:%d}".format(datetime.date.today())
        current_date_month = "{:%m}".format(datetime.date.today())
        current_date_year = "{:%Y}".format(datetime.date.today())
        game_list = self.registry.get_list( game_info['game_type'], current_date_day, current_date_month, current_date_year ) # will show for a day minus too
        return json.dumps( game_list )



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
