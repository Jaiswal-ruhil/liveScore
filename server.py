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
    app_url = None

    def __init__(self, configuration):
        """ Initialization the URL and the database,
        registry handler objects """

        self.app_url = configuration['app_url']
        self.database = Database(configuration['database_uri'])
        self.registry = Registry(self.database)
        self.registry.populate()

    @cherrypy.expose
    def login(self):
        """ Gets the user login info and returns if valid or not.
        Required json: resources/json/login.json
        Returned json: resources/json/common_response.json """

        import hashlib
        login_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        # check if user exists
        user_record = self.database.get_data('login', {
            'username': login_info['username']})
        if user_record is None:  # user not found
            return json.dumps({
                "status": "failed",
                "message": "user not found in the database"})
        else:
            entered_password = hashlib.md5(login_info['password'].encode())
            entered_password = entered_password.hexdigest()
            if user_record['password'] != entered_password:
                return json.dumps({
                    "status": "failed",
                    "message": "password incorrect"})
        return json.dumps({"status": "sucess", "message": "valid"})

    @cherrypy.expose  # call manually for now
    def signup(self):
        """ Gets the user login info and added it to the database. If user
        exists returns the required message
        Required json: resources/json/signup.json
        Returned json: resources/json/common_response.json """

        import hashlib
        login_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        # check if user exists
        user_record = self.database.get_data('login', {
            'username': login_info['username']
        })
        if user_record is None:  # user not found
            password = hashlib.md5(login_info['password'].encode()).hexdigest()
            self.database.insert("login", {
                "username": login_info['username'], "password": password
            })
            return json.dumps({"status": "sucess", "message": "user created"})
        else:
            return json.dumps({
                "status": "failed",
                "message": "user already exists"})

    @cherrypy.expose
    def register_game(self):
        """ Returns the if game was sucessfully registered.
        Required json: resources/json/register.json
        Returned json: resources/json/common_response.json """

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        new_game = Game(game_info['game_type'], self.database, self.registry)
        registeration_status = new_game.register(game_info)
        if registeration_status is None:
            return json.dumps({
                'status': 'failed',
                'message': 'could not make a entry in data base'
            })
        return json.dumps({
            'status': 'sucess',
            'message': 'game is registered in database'
        })

    @cherrypy.expose
    def update_game(self):
        """ Update the LIVE game score
        Required json: resources/json/update.json
        Returned json: resources/json/common_response.json """

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        Game = self.registry.get_game(game_info['game_id'])
        result = Game.update(game_info)
        if result is None:
            return json.dumps({
                'status': 'failed',
                'message': 'could not make a entry in data base'
            })
        return json.dumps({'status': 'sucess', 'message': 'game is updated'})

    @cherrypy.expose
    def score_board(self):
        """ Return the score to display
        Required json: resources/json/score_board.json
        Returned json: resources/json/score_board_response.json """

        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        Game = self.registry.get_game(game_info['game_id'])
        result = Game.score_board()
        return json.dumps(result)

    @cherrypy.expose
    def get_game_list(self):
        """ Return the game list for the day
        Required json: resources/json/game_list.json
        Returned json: resources/json/game_list_response.json """

        import datetime
        from pytz import timezone
        game_info = json.loads(cherrypy.request.body.read().decode('utf-8'))
        game_type = game_info['game_type']
        time_zone = timezone("Asia/Kolkata")
        current_date = "{:%d %m %Y}".format(datetime.datetime.now(time_zone))
        game_list = self.registry.get_list(game_type, current_date)
        return json.dumps(game_list)


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
