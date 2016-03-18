
def __cricket_score_board__(database, game_id_database, game_data):
    """ fetch the data from database using game id and return required data"""

    current_score_board = {}
    if game_data is None:
        game_data = database.get_game('CRICKET', game_id_database)
    game = game_data['attributes']
    active_team = game['team_list'][game['active_team']]
    current_score_board['batting_team'] = active_team['name']
    current_score_board['innings'] = game['innings']
    current_score_board['overs_completed'] = active_team['ball']
    current_score_board['current_socre'] = active_team['score']
    current_score_board['current_wickets'] = active_team['wickets']

    return current_socre_board


def __register_cricket_board__(database, registeration_data):
    """ inserts into the mongo Database and returns the object id
    on sucess and returns null if fails """

    return database.insert('CRICKET', registeration_data)


def __update_cricket_board__(database, game_id_database, update_info):
    """ update the cricket game with the new info """

    game_info = database.get_game('CRICKET', game_id_database)
    team = ""
    for team in game_info['teamsList']:
        if team['name'] == update_info['team_name']:
            break
    team['score'] = team['score']+update_info['increment_score'] if ("score" in team) else 0
    team['wicket'] = team['wicket']+update_info['increment_wicket'] if ("wicket" in team) else 0
    team['ball'] = team['ball']+update_info['increment_ball'] if ("ball" in team) else 0
    return database.update('CRICKET', game_id_database, game_data)


socre_board = {
    "CRICKET": __cricket_score_board__
}

register = {
    "CRICKET": __register_cricket_board__
}

update = {
    "CRICKET": __update_cricket_board__
}
