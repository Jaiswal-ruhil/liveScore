// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

 .state('app.member', {
      url: '/member',
      views: {
        'menuContent': {
          templateUrl: 'templates/member.html',
          controller: 'MemberCtrl'
        }
      }
    })

    .state('app.member.update_scoreboard', {
      url: '/update_scoreboard',
      views: {
        'update_scoreboard': {
          templateUrl: 'templates/update_scoreboard.html',
          controller: 'UpdateScoreBoardCtrl'
        }
      }
    })

    .state('app.member.register_match', {
      url: '/register_match',
      views: {
        'register_match': {
          templateUrl: 'templates/register_match.html',
          controller: 'RegisterMatchCtrl'
        }
      }
    })

    .state('app.sport', {
      url: '/sport',
      views: {
        'menuContent': {
          templateUrl: 'templates/sport.html',
          controller: 'SportCtrl'
        }
      }
    })

  .state('app.football', {
    url: '/sport/football',
    views: {
      'menuContent': {
        templateUrl: 'templates/football.html',
        controller: 'FootballCtrl'
      }
    }
  })
  .state('app.cricket', {
    url: '/sport/cricket',
    views: {
      'menuContent': {
        templateUrl: 'templates/cricket.html',
        controller: 'CricketCtrl'
      }
    }
  })
  .state('app.basketball', {
    url: '/sport/basketball',
    views: {
      'menuContent': {
        templateUrl: 'templates/basketball.html',
        controller: 'BasketballCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sport');
});
