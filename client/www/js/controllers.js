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
.controller('SearchResultsCtrl', function($scope, $location, Search){
  // dummy data
  $scope.searches = [
    {id: 1, address: '1600 Amphitheatre Pkwy, Mountain View, CA', seller: 'Joe', price: 10, lat: 37.422245, lng: -122.0840084}, //"lat" : 37.422245, "lng" : -122.0840084
    {id: 2, address: '1 World Way, Los Angeles, CA', seller: 'John', price: 15},
    {id: 3, address: '652 Polk St San Francisco, CA', seller: 'Katherine', price: 20},
    {id: 4, address: 'Dick\'s Sporting Goods Concord, NH 03301 United States', seller: 'Christina', price: 25},
    {id: 5, address: 'Highland Middle School, 15027 Bel-Red Rd Bellevue, WA 98007, United States', seller: 'Bob', price: 30}
  ];


  var map;
  $scope.getSearches = function(){

    var myLatlng = new google.maps.LatLng(37.422245,-122.0840084);
    var mapOptions = {
      zoom: 19,
      // map gets centered here
      // set center = wantedcoordinates for very last object in container
      center: myLatlng
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // var marker = new google.maps.Marker({
    //     position: myLatlng,
    //     title:"Hello World!"
    // });

    var marker = $scope.addMarker($scope.searches[0]['address'], map);

    // To add the marker to the map, call setMap();
    // marker.setMap(map);
    // markers.forEach(function(marker) {
    //   marker.setMap(map);
    // });

    // $location.path('app/searchresults');
  },

  // Add marker to map
  $scope.addMarker = function(addressString, map) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': addressString}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        return marker;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  $scope.addressArray = function(queryArray) {
    return _.map(queryArray, function(element){
      if (element.address !== undefined)
        return element.address;
    });
  }

  //API call when ready
  // $scope.searches = Search.query();
})

// Retrieves a specific search using the Search service and store it in scope
.controller('SearchResultCtrl', function($scope, $stateParams, Search){
  $scope.search = Search.get({id: $stateParams.searchId});
})

.controller('MapController', function($scope, $ionicLoading) {
    console.log("MapController");
    $scope.initialise = function() {
        console.log("In Google.maps.event.addDomListener");
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        var mapOptions = {
            center: myLatlng,
            zoom: 19,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        console.log(mapOptions);
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker;

        navigator.geolocation.getCurrentPosition(function(pos) {
            console.log(pos);
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;

        google.maps.event.addListener(map, 'click', function(event) {
            if (marker) { 
              marker.setMap(null); 
            }
            marker = new google.maps.Marker({ position: event.latLng, map: map});
        });
    };
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());


});









