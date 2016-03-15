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
    var serverUrl = 'http://0.0.0.0:5000/validateLogin';
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
        $scope.showAlert('No Active Connection', 'Connection to the server is servered')
      });
  };
  $scope.logout = function(){
    Parse.User.logOut();
    $scope.newUser = {};
    $scope.loginSucess = false;
    $scope.modal.show();
    $scope.loginData = {};
  }
})

.controller('RegisterMatchCtrl', function($scope) {
})

.controller('UpdateScoreBoardCtrl', function($scope) {
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
