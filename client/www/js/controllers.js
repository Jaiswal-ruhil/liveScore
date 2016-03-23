  angular.module('starter.controllers', [])

.controller('MemberCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPopup, ionicMaterialInk) {
// Form data for the login modal
  $scope.loginData = {};
  $scope.loginData.loginSuccess = false;
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openLogin = function() {
    $scope.modal.show();
  };

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.openLogin();
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.login();
  };
  $scope.login = function(){
    var serverUrl = 'http://localhost:5050/login';
    var payload = {
      'username': $scope.loginData.username,
      'password': $scope.loginData.password
    }
    $http.post(serverUrl, JSON.stringify(payload), {responseType:'json'}).success(function(response) {
        if(response.message === "valid"){
          $scope.modal.hide()
          $scope.loginData.loginSuccess = true;
        }
        else if(response.message === 'invalid'){
          $scope.showAlert('Invalid Authentication', 'Invalid Username or Password')
        }
        else{
          $scope.showAlert('Error!', 'Could not login with the provided credentials')
        }
      }).error(function(user, error) {
        // The login failed. Check error to see why.
        $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
        $scope.modal.hide();
      });
  };
  $scope.logout = function(){
    $scope.modal.show();
    $scope.loginData = {};
  }
})

.controller('RegisterCricketMatchCtrl', function($scope, $http, $ionicPopup, ionicMaterialInk, $timeout) {
   Date.prototype.ddmmyyyy = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return (dd[1]?dd:"0"+dd[0]) + " " + (mm[1]?mm:"0"+mm[0]) + " " + yyyy // padding
  };
  $scope.match_details = {
    "attributes": {"team_list": [{}, {}]}
  };
  $scope.submitData = function(){
    var serverUrl = "http://localhost:5050/register_game"
    date = new Date($scope.match_details['temp_date'])
    $scope.match_details['date'] = date.ddmmyyyy()
    $scope.match_details['game_type'] = 'CRICKET';
    $http.post(serverUrl, JSON.stringify($scope.match_details), {responseType: 'json'}).success(function(response){
      console.log(response);
      $scope.showAlert('Match Registered', 'Details sucessfully updated.')
    }).error(function(response){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    })
  }
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };
})

.controller('RegisterFootballMatchCtrl', function($scope, $http, $ionicPopup, ionicMaterialInk, $timeout) {
   Date.prototype.ddmmyyyy = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return (dd[1]?dd:"0"+dd[0]) + " " + (mm[1]?mm:"0"+mm[0]) + " " + yyyy // padding
  };
  $scope.match_details = {
    "attributes": {"team_list": [{}, {}]}
  };
  $scope.submitData = function(){
    var serverUrl = "http://localhost:5050/register_game"
    date = new Date($scope.match_details['temp_date'])
    $scope.match_details['date'] = date.ddmmyyyy()
    $scope.match_details['game_type'] = 'FOOTBALL';
    $http.post(serverUrl, JSON.stringify($scope.match_details), {responseType: 'json'}).success(function(response){
      console.log(response);
      $scope.showAlert('Match Registered', 'Details sucessfully updated.')
    }).error(function(response){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    })
  }
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };
})

.controller('RegisterBasketballMatchCtrl', function($scope, $http, $ionicPopup, ionicMaterialInk, $timeout) {
   Date.prototype.ddmmyyyy = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return (dd[1]?dd:"0"+dd[0]) + " " + (mm[1]?mm:"0"+mm[0]) + " " + yyyy // padding
  };
  $scope.match_details = {
    "attributes": {"team_list": [{}, {}]}
  };
  $scope.submitData = function(){
    var serverUrl = "http://localhost:5050/register_game"
    date = new Date($scope.match_details['temp_date'])
    $scope.match_details['date'] = date.ddmmyyyy()
    $scope.match_details['game_type'] = 'BASKETBALL';
    $http.post(serverUrl, JSON.stringify($scope.match_details), {responseType: 'json'}).success(function(response){
      console.log(response);
      $scope.showAlert('Match Registered', 'Details sucessfully updated.')
    }).error(function(response){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    })
  }
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };
})

.controller('UpdateCricketScoreBoardCtrl', function($scope, $http, ionicMaterialInk, $ionicPopup, $timeout, $ionicLoading) {
  $scope.score = {}
  $scope.increment = {
    'extras': 0,
    'wickets': 0,
    'runs': 0
  }
    /** Shows the loading screen */
  $scope.showLoadingScreen = function() {
    $ionicLoading.show();
  };

  /** Hides the loading screen */
  $scope.hideLoadingScreen = function(){
    $ionicLoading.hide();
  };
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };
  $scope.getMatchList = function(){
    var serverUrl = "http://localhost:5050/get_game_list";
    $http.post(serverUrl, JSON.stringify({'game_type': 'cricket'}), {responseType:'json'}).success(function(response){
      if(response.list === null){
        $scope.matchList = []
      }
      else{
        $scope.matchList = response.list;
      }
    }).error(function(data){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    });
  }
  $scope.updateMatch = function(id){
    $scope.score.currentMatch = $scope.score.currentMatchData.unique_id;
    var id = $scope.score.currentMatch;
    if(id !== undefined){
      if($scope.score[id] == undefined){
        var serverUrl = 'http://localhost:5050/score_board'
        var payload = {
          "game_id": id,
          "game_type": "CRICKET"
        }
        $scope.showLoadingScreen();
        $http.post(serverUrl, JSON.stringify(payload), {responseType: 'json'}).success(function(response){
          response = response.board;
          response['current_score'] = response['current_socre'];
          $scope.score[id] = response;
          $scope.score.currentMatch = id;
          $scope.hideLoadingScreen();
      }).error(function(data){
          $scope.hideLoadingScreen();
          $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
        })
      }
      else{
        $scope.score.currentMatch = id;
        $scope.increment = {
            'wickets': 0,
            'runs': 0,
            'extras': 0,
          }
      }
    }
  }
  $scope.updateScore = function(){
    var id = $scope.score.currentMatch;
    console.log($scope.increment);
    var payload = {
      "game_id":  id,
      "team_name": $scope.score.currentTeam,
      "increment_score_player": $scope.increment.runs,
      "increment_score_extra": $scope.increment.extras,
      "increment_wicket": $scope.increment.wickets,
      "game_type": "CRICKET"
    }
    var serverUrl = 'http://localhost:5050/update_game'
    $scope.showLoadingScreen();
    $http.post(serverUrl, payload, {responseType: 'json'}).success(function(response){
      $scope.hideLoadingScreen();
      $scope.score[id].current_wickets += $scope.increment.wickets;
      $scope.score[id].current_score += $scope.increment.runs;
      $scope.score[id].extras += $scope.increment.extras;
    }).error(function(data){
      $scope.hideLoadingScreen();
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
      $scope.score[id].wickets += $scope.increment.wickets;
      $scope.score[id].runs += $scope.increment.runs;
      $scope.score[id].extras += $scope.increment.extras;
    })
  }
  $scope.$watch(
    function(){return $scope.loginData.loginSuccess},
    function(newValue, oldValue){
      if(newValue === true){
        $scope.getMatchList();
      }
    }, true);
})

.controller('UpdateBasketballScoreBoardCtrl', function($scope, $http, ionicMaterialInk, $ionicPopup, $timeout, $ionicLoading) {
  $scope.score = {}
  $scope.increment = {
    'score': 0,
    'fouls': 0,
    'bonus': 0,
  }
    /** Shows the loading screen */
  $scope.showLoadingScreen = function() {
    $ionicLoading.show();
  };

  /** Hides the loading screen */
  $scope.hideLoadingScreen = function(){
    $ionicLoading.hide();
  };
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };
  $scope.getMatchList = function(){
    var serverUrl = "http://localhost:5050/get_game_list";
    $http.post(serverUrl, JSON.stringify({'game_type': 'basketball'}), {responseType:'json'}).success(function(response){
      if(response.list === null){
        $scope.matchList = []
      }
      else{
        $scope.matchList = response.list;
      }
    }).error(function(data){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    });
  }
  $scope.updateMatch = function(id){
    $scope.score.currentMatch = $scope.score.currentMatchData.unique_id;
    var id = $scope.score.currentMatch;
    if(id !== undefined){
      if($scope.score[id] == undefined){
        var serverUrl = 'http://localhost:5050/score_board'
        var payload = {
          "game_id": id,
          "game_type": "BASKETBALL"
        }
        $scope.showLoadingScreen();
        $http.post(serverUrl, JSON.stringify(payload), {responseType: 'json'}).success(function(response){
          response = response.board;
          response['current_score'] = response['current_socre'];
          $scope.score[id] = response;
          $scope.score.currentMatch = id;
          $scope.hideLoadingScreen();
      }).error(function(data){
          $scope.hideLoadingScreen();
          $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
        })
      }
      else{
        $scope.score.currentMatch = id;
        $scope.increment = {
            'score': 0,
            'bonus': 0,
            'fouls': 0,
          }
      }
    }
  }
  $scope.updateScore = function(){
    var id = $scope.score.currentMatch;
    console.log($scope.increment);
    var payload = {
      "game_id":  id,
      "team_name": $scope.score.currentTeam,
      "increment_score": $scope.increment.score,
      "increment_bonus": $scope.increment.bonus,
      "increment_fouls": $scope.increment.fouls,
      "game_type": "BASKETBALL"
    }
    var serverUrl = 'http://localhost:5050/update_game'
    $scope.showLoadingScreen();
    $http.post(serverUrl, payload, {responseType: 'json'}).success(function(response){
      $scope.hideLoadingScreen();
      $scope.score[id].current_score += $scope.increment.score;
      $scope.score[id].current_bonus += $scope.increment.bonus;
      $scope.score[id].fouls += $scope.increment.fouls;
    }).error(function(data){
      $scope.hideLoadingScreen();
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
      $scope.score[id].score += $scope.increment.score;
      $scope.score[id].bonus += $scope.increment.bonus;
      $scope.score[id].fouls += $scope.increment.fouls;
    })
  }
  $scope.$watch(
    function(){return $scope.loginData.loginSuccess},
    function(newValue, oldValue){
      if(newValue === true){
        $scope.getMatchList();
      }
    }, true);
})

.controller('UpdateFootballScoreBoardCtrl', function($scope, $http, ionicMaterialInk, $ionicPopup, $timeout, $ionicLoading) {
  $scope.score = {}
  $scope.increment = {
    'goals': 0,
    'fouls': 0,
    'bonus': 0,
  }
    /** Shows the loading screen */
  $scope.showLoadingScreen = function() {
    $ionicLoading.show();
  };

  /** Hides the loading screen */
  $scope.hideLoadingScreen = function(){
    $ionicLoading.hide();
  };
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };
  $scope.getMatchList = function(){
    var serverUrl = "http://localhost:5050/get_game_list";
    $http.post(serverUrl, JSON.stringify({'game_type': 'football'}), {responseType:'json'}).success(function(response){
      if(response.list === null){
        $scope.matchList = []
      }
      else{
        $scope.matchList = response.list;
      }
    }).error(function(data){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    });
  }
  $scope.updateMatch = function(id){
    $scope.score.currentMatch = $scope.score.currentMatchData.unique_id;
    var id = $scope.score.currentMatch;
    if(id !== undefined){
      if($scope.score[id] == undefined){
        var serverUrl = 'http://localhost:5050/score_board'
        var payload = {
          "game_id": id,
          "game_type": "FOOTBALL"
        }
        $scope.showLoadingScreen();
        $http.post(serverUrl, JSON.stringify(payload), {responseType: 'json'}).success(function(response){
          response = response.board;
          response['current_score'] = response['current_socre'];
          $scope.score[id] = response;
          $scope.score.currentMatch = id;
          $scope.hideLoadingScreen();
      }).error(function(data){
          $scope.hideLoadingScreen();
          $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
        })
      }
      else{
        $scope.score.currentMatch = id;
        $scope.increment = {
            'goal': 0,
            'bonus': 0,
            'fouls': 0,
          }
      }
    }
  }
  $scope.updateScore = function(){
    var id = $scope.score.currentMatch;
    console.log($scope.increment);
    var payload = {
      "game_id":  id,
      "team_name": $scope.score.currentTeam,
      "increment_goals": $scope.increment.goals,
      "increment_bonus": $scope.increment.bonus,
      "increment_fouls": $scope.increment.fouls,
      "game_type": "FOOTBALL"
    }
    var serverUrl = 'http://localhost:5050/update_game'
    $scope.showLoadingScreen();
    $http.post(serverUrl, payload, {responseType: 'json'}).success(function(response){
      $scope.hideLoadingScreen();
      $scope.score[id].current_goals += $scope.increment.goals;
      $scope.score[id].current_bonus += $scope.increment.bonus;
      $scope.score[id].fouls += $scope.increment.fouls;
    }).error(function(data){
      $scope.hideLoadingScreen();
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
      $scope.score[id].goals += $scope.increment.goals;
      $scope.score[id].bonus += $scope.increment.bonus;
      $scope.score[id].fouls += $scope.increment.fouls;
    })
  }
  $scope.$watch(
    function(){return $scope.loginData.loginSuccess},
    function(newValue, oldValue){
      if(newValue === true){
        $scope.getMatchList();
      }
    }, true);
})

.controller('SportCtrl', function($scope) {
  $scope.sport_list = [
    { title: 'Cricket', url: 'cricket' },
    { title: 'Football', url: 'football' },
    { title: 'Basketball', url: 'basketball' }
  ];
})

.controller('FootballCtrl', function($scope, $http, $ionicPopup, $interval, $ionicLoading, ionicMaterialInk, ionicMaterialMotion, $timeout) {
  $scope.showData = false;
  $scope.match = {};
  ionicMaterialInk.displayEffect();
  
  /** Shows the loading screen */
  $scope.showLoadingScreen = function() {
    $ionicLoading.show();
  };

  /** Hides the loading screen */
  $scope.hideLoadingScreen = function(){
    $ionicLoading.hide();
  };

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };

 $scope.intervalPromise = $interval(function(){
          $scope.refreshMatchDetails(false);
    }, 10000);  

  $scope.refreshMatchDetails = function(useLoadingScreen){
    var serverUrl = 'http://localhost:5000/getMatchDetails'
    useLoadingScreen && $scope.showLoadingScreen();
    $http.get(serverUrl).success(function(response){
      $scope.$broadcast('scroll.refreshComplete');
      if(response.status === 'OK'){
        $scope.match = response.data
      }
      useLoadingScreen && $scope.hideLoadingScreen();
    }).error(function(data){
      $scope.$broadcast('scroll.refreshComplete');
      useLoadingScreen && $scope.hideLoadingScreen();
      useLoadingScreen && $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
    })
  };
  $scope.refreshMatchDetails(true);
})

.controller('BasketballCtrl', function($scope, $http, $ionicPopup, $interval, $ionicLoading, ionicMaterialInk, ionicMaterialMotion, $timeout) {
  $scope.showData = false;
  $scope.match = {};
  ionicMaterialInk.displayEffect();
  
  /** Shows the loading screen */
  $scope.showLoadingScreen = function() {
    $ionicLoading.show();
  };

  /** Hides the loading screen */
  $scope.hideLoadingScreen = function(){
    $ionicLoading.hide();
  };

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };

 $scope.intervalPromise = $interval(function(){
          $scope.refreshMatchDetails(false);
    }, 10000);  

  $scope.refreshMatchDetails = function(useLoadingScreen){
    var serverUrl = 'http://localhost:5000/getMatchDetails'
    useLoadingScreen && $scope.showLoadingScreen();
    $http.get(serverUrl).success(function(response){
      $scope.$broadcast('scroll.refreshComplete');
      if(response.status === 'OK'){
        $scope.match = response.data
      }
      useLoadingScreen && $scope.hideLoadingScreen();
    }).error(function(data){
      $scope.$broadcast('scroll.refreshComplete');
      useLoadingScreen && $scope.hideLoadingScreen();
      useLoadingScreen && $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
    })
  };
  $scope.refreshMatchDetails(true);
})

.controller('CricketCtrl', function($scope, $http, $ionicPopup, $interval, $ionicLoading, ionicMaterialInk, ionicMaterialMotion, $timeout) {
  $scope.showData = false;
  $scope.match = {};
  $scope.score = {}
  ionicMaterialInk.displayEffect();
  
  /** Shows the loading screen */
  $scope.showLoadingScreen = function() {
    $ionicLoading.show();
  };

  /** Hides the loading screen */
  $scope.hideLoadingScreen = function(){
    $ionicLoading.hide();
  };

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    $timeout(function() {
      // Ionic material animation
      ionicMaterialInk.displayEffect()
    }, 500);
  };

 $scope.intervalPromise = $interval(function(){
          $scope.score.currentMatch && $scope.updateMatch(false);
          //scope.updateScore();
    }, 10000);  

  $scope.getMatchList = function(){
    var serverUrl = "http://localhost:5050/get_game_list";
    $http.post(serverUrl, JSON.stringify({'game_type': 'cricket'}), {responseType:'json'}).success(function(response){
      if(response.list === null){
        $scope.matchList = []
      }
      else{
        $scope.matchList = response.list;
      }
    }).error(function(data){
      $scope.showAlert('No Active Connection', 'Connection to the server is Severed')
    });
  }
  $scope.updateMatch = function(useLoadingScreen){
    $scope.score.currentMatch = $scope.score.currentMatchData.unique_id;
    var id = $scope.score.currentMatch;
    useLoadingScreen && $scope.showLoadingScreen();
    if(id !== undefined){
        var serverUrl = 'http://localhost:5050/score_board'
        var payload = {
          "game_id": id,
          "game_type": "CRICKET"
        }
        $http.post(serverUrl, JSON.stringify(payload), {responseType: 'json'}).success(function(response){
          $scope.$broadcast('scroll.refreshComplete');
          response = response.board;
          response['current_score'] = response['current_socre'];
          $scope.score[id] = response;
          $scope.score.currentMatch = id;
          useLoadingScreen && $scope.hideLoadingScreen();
      }).error(function(data){
          $scope.$broadcast('scroll.refreshComplete');
          useLoadingScreen && $scope.hideLoadingScreen();
          useLoadingScreen && $scope.showAlert('No Active Connection', 'Connection to the server is Severed');
      })
    }
  }
  //$scope.refreshMatchDetails(true);
  $scope.getMatchList(true);
});
