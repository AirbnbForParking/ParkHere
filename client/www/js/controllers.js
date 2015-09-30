angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout){
  // Controllers in Ionic are only called when they are recreated or on 
  // app start, instead of every page change

  // Form data for login modal
  $scope.loginData = {}

  // Create login modal
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal){
    $scope.modal = modal;
  })

  // Triggered in login modal to close
  $scope.closeLogin = function(){
    $scope.modal.hide();
  };

  //Open the login modal
  $scope.login = function(){
    $scope.modal.show();
  };

  // Perform login action when the user submits the login form
  $scope.doLogin = function(){
    console.log("Browser Console - Logging in with ", $scope.loginData);
    // Simulate a login delay.  Remove and replace later with login code and login system
    $timeout(function(){
      $scope.closeLogin();
    }, 1000);
  };
})

//retrieves results of search
.controller('SearchResultsCtrl', function($scope, Search){
  // dummy data
  $scope.searches = [
    {id: 1, address: '123 first street', seller: 'Joe', price: 10},
    {id: 2, address: '345 second street', seller: 'John', price: 15},
    {id: 3, address: '567 third street', seller: 'Katherine', price: 20},
    {id: 4, address: '789 fourth street', seller: 'Christina', price: 25}
  ];

  $scope.test = function(){
    console.log('testinthecontroller');
  }

  //API call when ready
  // $scope.searches = Search.query();
})

// Retrieves a specific search using the Search service and store it in scope
.controller('SearchResultCtrl', function($scope, $stateParams, Search){
  $scope.search = Search.get({id: $stateParams.searchId});
})







