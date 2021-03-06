// Point of this module is to create a Session service
// that uses the Angular resource module (ngResource)
// to retrieve data using REST services

angular.module('starter.services', ['ngResource'])

//Uses angular resource module to provice access to REST services at specified endpoint
// Externalize the server parameters in a config module for the future

.factory('Search', function($resource){
  return $resource('http://localhost:5000/search/:searchId');
})

.factory('History', function($resource){
  return $resource('http://localhost:5000/history/:historyId');
})

.factory('Login', function($http){
  return {
    signIn: function(loginData) {
      return $http({
        method: 'POST',
        url: '/api/login',
        data: loginData
      })
      .then(function(response){
        return response.data.token;
        console.log('response: ',response);
      });
    }
  };
})

.factory('Register', function($http){
  return {
    registerIn: function(registerData) {
      return $http({
        method: 'POST',
        url: '/api/register',
        data: registerData
      })
      .then(function(response){
        return response.data.token;
        console.log(response);
      });
    }
  };
})

.factory('Listing', function($http){
  return {
    getListings: function() {
      return $http({
        method: 'GET',
        url: '/api/listing'
      })
      .then(function(response){
        return response.data;
        console.log(response.data);
      });
    },
    addListing: function(listing) {
      return $http({
        method: 'POST',
        url: '/api/listing',
        data: listing
      })
      .then(function(response){
        return response.data.token;
        console.log(response);
      });
    }
  };
})

.factory('Profile', function($resource){
  return $resource('http://localhost:5000/profile/:profileId');
});

