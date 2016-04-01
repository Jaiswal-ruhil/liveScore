def __FOOTBALL_score_board__(database, game_id):
    """ fetch the data from database using game id and return required data"""

    data = database.get_data("FOOTBALL", {"unique_id": game_id}, {
        "unique_id": 1,
        "attributes.team_list": 1})
    print(data)
    board = {
                "unique_id": data['unique_id'],
                "team_list": data['attributes']['team_list']
            }
    return board


def __register_FOOTBALL_board__(database, registeration_data):
    """ inserts into the mongo Database and returns the object id
    on sucess and returns null if fails """

    import datetime
    date = datetime.datetime.now()
    registeration_data['unique_id'] = '{:%Y%m%d%H%M%S%s}'.format(date)
    registeration_data['teams'] = []
    for team in registeration_data['attributes']['team_list']:
        registeration_data['teams'].append(team['name'])
    team_list = registeration_data['attributes']['team_list']
    for team in team_list:
        team['goals'] = 0
        team['foul'] = 0
        team['bonus'] = 0
    return database.insert("FOOTBALL", registeration_data)


def __update_FOOTBALL_board__(database, game_info, update_data):
    """ update the CRICKET game with the new info """

    goals = int(update_data["increment_goals"])
    foul = int(update_data["increment_foul"])
    bonus = int(update_data["increment_bonus"])
    team_list = game_info['attributes']['team_list']
    for team in team_list:
        if(team["name"] == update_data["team_name"]):
            team['goals'] += goals
            team['bonus'] += bonus
            team['foul'] += foul
    selector = {"unique_id": game_info["unique_id"]}
    game_type = game_info["game_type"]
    return database.update(game_type, selector, game_info)


def __BASKETBALL_score_board__(database, game_id):
    """ fetch the data from database using game id and return required data"""

    data = database.get_data("BASKETBALL", {"unique_id": game_id}, {
        "unique_id": 1,
        "attributes.team_list": 1})
    board = {
                "unique_id": data['unique_id'],
                "team_list": data['attributes']['team_list']
            }
    return board


def __register_BASKETBALL_board__(database, registeration_data):
    """ inserts into the mongo Database and returns the object id
    on sucess and returns null if fails """

    import datetime
    date = datetime.datetime.now()
    registeration_data['unique_id'] = '{:%Y%m%d%H%M%S%s}'.format(date)
    registeration_data['teams'] = []
    for team in registeration_data['attributes']['team_list']:
        registeration_data['teams'].append(team['name'])
    team_list = registeration_data['attributes']['team_list']
    for team in team_list:
        team['score'] = 0
        team['foul'] = 0
        team['bonus'] = 0
    return database.insert("BASKETBALL", registeration_data)


def __update_BASKETBALL_board__(database, game_info, update_data):
    """ update the CRICKET game with the new info """

    score = int(update_data["increment_score"])
    foul = int(update_data["increment_foul"])
    bonus = int(update_data["increment_bonus"])
    team_list = game_info['attributes']['team_list']
    for team in team_list:
        if(team["name"] == update_data["team_name"]):
            team['score'] += score
            team['bonus'] += bonus
            team['foul'] += foul
    selector = {"unique_id": game_info["unique_id"]}
    game_type = game_info["game_type"]
    return database.update(game_type, selector, game_info)


def __CRICKET_score_board__(database, game_id):
    """ fetch the data from database using game id and return required data"""

    board = {
      "unique_id": game_id,
      "batting_team": "",
      "overs_completed": "",
      "current_socre": "",
      "current_wickets": ""
    }
    data = database.get_data("CRICKET", {"unique_id": game_id})
    board["batting_team"] = data["batting_team"]
    team_list = data['attributes']['team_list']
    board['team_list'] = data['teams']
    for team in team_list:
        if(team["name"] == data["batting_team"]):
            board['overs_completed'] = str(int(team['ball']/6))+"."+str(team['ball'] % 6)
            board['current_socre'] = team['score']
            board['extra_score'] = team['extra']
            board['current_wickets'] = team['wickets']
    return board


def __register_CRICKET_board__(database, registeration_data):
    """ inserts into the mongo Database and returns the object id
    on sucess and returns null if fails """

    import datetime
    date = datetime.datetime.now()
    registeration_data['unique_id'] = '{:%Y%m%d%H%M%S%s}'.format(date)
    registeration_data['teams'] = []
    for team in registeration_data['attributes']['team_list']:
        registeration_data['teams'].append(team['name'])
    registeration_data['batting_team'] = registeration_data['teams'][0]
    team_list = registeration_data['attributes']['team_list']
    for team in team_list:
        team['score'] = 0
        team['extra'] = 0
        team['wickets'] = 0
        team['ball'] = 0
    return database.insert("CRICKET", registeration_data)


def __update_CRICKET_board__(database, game_info, update_data):
    """ update the CRICKET game with the new info """

    game_info["batting_team"] = update_data['team_name']
    score = int(update_data["increment_score_player"])
    extra = int(update_data["increment_score_extra"])
    wickets = int(update_data["increment_wicket"])
    ball = 0 if extra else 1
    team_list = game_info['attributes']['team_list']
    for team in team_list:
        if(team["name"] == update_data["team_name"]):
            team['score'] += score + extra
            team['extra'] += extra
            team['wickets'] += wickets
            team['ball'] += ball
    selector = {"unique_id": game_info["unique_id"]}
    game_type = game_info["game_type"]
    return database.update(game_type, selector, game_info)


register = {
    "CRICKET": __register_CRICKET_board__,
    "FOOTBALL": __register_FOOTBALL_board__,
    "BASKETBALL": __register_BASKETBALL_board__
}
score_board = {
    "CRICKET": __CRICKET_score_board__,
    "FOOTBALL": __FOOTBALL_score_board__,
    "BASKETBALL": __BASKETBALL_score_board__
}
update = {
    "CRICKET": __update_CRICKET_board__,
    "FOOTBALL": __update_FOOTBALL_board__,
    "BASKETBALL": __update_BASKETBALL_board__
}
