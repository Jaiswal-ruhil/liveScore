angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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
