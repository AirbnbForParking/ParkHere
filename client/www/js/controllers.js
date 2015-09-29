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