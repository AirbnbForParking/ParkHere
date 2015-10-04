// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (typeof google === 'undefined' || typeof google === undefined) {
      console.log("Google maps unavailable");
    }
  });
})

// Custom directive ng-enter, this listens for the enter key
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})

// Client Side Routing
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('app', {
    url: '/app',
    // sets up one state to be the default state of parent
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.history', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html'
      }
    }
  })

  .state('app.listing', {
    url: '/listing',
    views: {
      'menuContent': {
        templateUrl: 'templates/listing.html',
        controller: 'ListingCtrl'
      }
    }
  })

  .state('app.searches', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchResultsCtrl'
      }
    }
  })

  .state('app.searchresults', {
    url: '/searchresults',
    views: {
      'menuContent': {
        templateUrl: 'templates/searchresults.html',
        controller: 'SearchResultsCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search/:searchId',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchResultCtrl'
      }
    }
  });

  //Fallback Route
  $urlRouterProvider.otherwise('/app/search');

});
