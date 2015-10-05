  // Point of this module is to create a Session service
// that uses the Angular resource module (ngResource)
// to retrieve data using REST services

angular.module('starter.services', ['ngResource'])

//Uses angular resource module to provice access to REST services at specified endpoint
// Externalize the server parameters in a config module for the future

.factory('Search', function($resource){
  return $resource('http://localhost:5000/search/:searchId');
})

.factory('Historie', function($resource){
  return $resource('/api/history/:historyId');
})

.factory('Login', function($http){
  var userID = null;
  return {
    signIn: function(loginData) {
      return $http({
        method: 'POST',
        url: '/api/login',
        data: loginData
      })
      .then(function(response){
        console.log('response: ',response);
        //set the userID here
        return response.data.token;       
      });
    },
    userID: userID
  };
})

// .factory('Login', function($resource){
//   return $resource('api/login');
// })

.factory('Register', function($http){
  var userID = null;
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
    },
    userID: userID
  };
})

// .factory('Register', function($resource){
//   return $resource('api/register');
// })

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

