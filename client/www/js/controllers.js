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
    var serverUrl = 'http://localhost:5000/validateLogin';
    var payload = {
      'username': $scope.loginData.username,
      'password': $scope.loginData.password
    }
    $http.post(serverUrl, payload).success(function(response) {
        if(response.status === "VALID"){
          $scope.modal.hide()
          $scope.loginData.loginSuccess = true;
        }
        else if(response.status === 'INVALID'){
          $scope.showAlert('Invalid Authentication', 'Invalid Username or Password')
        }
        else{
          $scope.showAlert('Error!', 'Could not login with the provided credentials')
        }
      }).error(function(user, error) {
      // The login failed. Check error to see why.
        //$scope.showAlert('No Active Connection', 'Connection to the server is Severed')
        $scope.loginData.loginSuccess = true;
        $scope.modal.hide();
      });
  };
  $scope.logout = function(){
    $scope.modal.show();
    $scope.loginData = {};
  }
})

.controller('RegisterMatchCtrl', function($scope, $http, $ionicPopup, ionicMaterialInk, $timeout) {
  $scope.sport_list = ['cricket', 'basketball', 'football'];
  $scope.match_details = {
    "attributes": {"teamsList": [{}, {}]}
  };
  $scope.submitData = function(){
    var serverUrl = "http://localhost:5000/newMatch"
    $http.post(serverUrl, $scope.match_details).success(function(response){
      console.log($scope.match_details);
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

.controller('UpdateScoreBoardCtrl', function($scope, $http, ionicMaterialInk, $ionicPopup, $timeout, $ionicLoading) {
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
    var serverUrl = "http://localhost:5000/getMatchList";
    $http.get(serverUrl).success(function(response){
      $scope.matchList = response;
    }).error(function(data){
      //$scope.showAlert('No Active Connection', 'Connection to the server is Severed')
      $scope.matchList = [
        {'id': 12, 'title': 'M1'},
        {'id': 23, 'title': 'M2'}
      ];
    });
  }
  $scope.updateMatch = function(){
    var id = $scope.score.currentMatch.id;
    if(id !== undefined){
      if($scope.score[id] == undefined){
        var serverUrl = 'http://localhost:5000/getMatchDetails/%id'
        serverUrl.replace('%id', id);
        $scope.showLoadingScreen();
        $http.get(serverUrl).success(function(response){
          $scope.score[id] = response;
          $scope.currentMatch = response;
          $scope.hideLoadingScreen();
      }).error(function(data){
          $scope.hideLoadingScreen();
          $scope.currentMatch = {'wickets':3, 'runs': 7, 'extras': 12};
          $scope.score[id] = $scope.currentMatch;
          //$scope.showAlert('No Active Connection', 'Connection to the server is Severed');
        })
      }
      else{
        $scope.currentMatch = $scope.score[id];
        $scope.increment = {
            'wickets': 0,
            'runs': 0,
            'extras': 0,
          }
      }
    }
  }
  $scope.updateScore = function(){
    var id = $scope.score.currentMatch.id;
    console.log($scope.increment);
    var serverUrl = 'http://localhost:5000/submitMatchDetails'
    $scope.showLoadingScreen();
    $http.post(serverUrl, $scope.increment).success(function(response){
      $scope.hideLoadingScreen();
      $scope.score[id].wickets += $scope.increment.wickets;
      $scope.score[id].runs += $scope.increment.runs;
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
});
