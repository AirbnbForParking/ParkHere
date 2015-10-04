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
    {id: 1, address: '1600 Amphitheatre Pkwy, Mountain View, CA', seller: 'Joe', price: 10, lat: 37.422245, lng: -122.0840084},
    {id: 2, address: '1 World Way, Los Angeles, CA', seller: 'John', price: 15, lat: 33.94224, lng: -118.40279},
    {id: 3, address: '652 Polk St San Francisco, CA', seller: 'Katherine', price: 20, lat: 37.78291, lng: -122.41902},
    {id: 4, address: 'Dick\'s Sporting Goods Concord, NH 03301 United States', seller: 'Christina', price: 25, lat: 43.22697, lng: -71.48562},
    {id: 5, address: 'Highland Middle School, 15027 Bel-Red Rd Bellevue, WA 98007, United States', seller: 'Bob', price: 30, lat: 47.62657, lng: -122.14020},
      // dummy cluster
    {id: 6, address: '582 Sutter St San Francisco, CA 94102', seller: 'Bob', price: 30, lat: 37.78918, lng: -122.40993},
    {id: 7, address: '678 Post St San Francisco, CA 94109', seller: 'Bob', price: 30, lat: 37.78776, lng: -122.41295},
    {id: 8, address: '850 Bush St San Francisco, CA 94108', seller: 'Bob', price: 30, lat: 37.79003, lng: -122.41134},
    {id: 9, address: '144 Taylor St San Francisco, CA 94102', seller: 'Bob', price: 30, lat: 37.78391, lng: -122.41067},
    {id: 10, address: '912 Sutter St San Francisco, CA 94104', seller: 'Bob', price: 30, lat: 37.78854, lng: -122.41548},
    {id: 11, address: '754 Post St San Fran cisco, CA 94109', seller: 'Bob', price: 30, lat: 37.78778, lng: -122.41436},
    {id: 12, address: '670 Larkin St San Francisco, CA 94109', seller: 'Bob', price: 30, lat: 37.78407, lng: -122.41759},
    {id: 13, address: '798 Sutter St San Francisco, CA 94109', seller: 'Bob', price: 30, lat: 37.78878, lng: -122.41347},
    {id: 14, address: '871 Sutter St San Francisco, CA 94109', seller: 'Bob', price: 30, lat: 37.78823, lng: -122.41459},
    {id: 15, address: '619 Taylor St San Francisco, CA 94102', seller: 'Bob', price: 30, lat: 37.78820, lng: -122.41204}
  ];


  var map;
  var markers = [];

  //Called when input is submitted
  $scope.getSearches = function(input){
    // get coordinates for input
    var mapOptions;
    var myLatlng = $scope.AddressToLocation(input, function(location){

      console.log(location); // {H: 37.422245, L: -122.0840084}
      var mapOptions = {
        zoom: 19,
        // map gets centered here
        center: location
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      // Adds an event listener for when map is done changing/zooming      
      google.maps.event.addListener(map, 'idle', $scope.showMarkers);

      // Drops a custom marker for searched address
      $scope.addMarkerGeo(location, map);
    });
  };

  // Show Markers gets called whenever map is done changing/zooming
  $scope.showMarkers = function(){
    // Get longitudinal and latitudinal boundaries
    var bounds = map.getBounds(); 
      // bounds object looks like this {Ka: {j: #, H: #}, Ga: {j: #, H: #}}
      // Ka = lat, Ka.j = top boundary, Ka.H = bottom boundary
      // Ga = long, Ga.j = left boundary, Ga.H = right boundary
    
    // Call the server with ajax passing it the bounds  

    //============ Happening server-side ================
    //*** replace searches with the data from database***

      // filter markers
      var filtered = $scope.searches.filter(function(parkingSpot){
        // Boolean for whether parkingSpot is in the boundary
        var withinBoundary = parkingSpot.lat < bounds.Ka.j && parkingSpot.lat > bounds.Ka.H 
            && parkingSpot.lng < bounds.Ga.H && parkingSpot.lng > bounds.Ga.j;
        return withinBoundary;
      });
    //===================================================

    // In the ajax callback delete the current markers and add new markers
      // delete current markers
        $scope.clearMarkers();


      // read current markers
      // *** dummy data, replace filtered with the filtered array from the server later ***
        filtered.forEach(function(obj) {
          markers.push($scope.addMarker(obj,map));
        });

  };

  //Clear current markers
  $scope.clearMarkers = function(){
    console.log(markers);
    for (var i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
    markers = [];
  }

  // Add marker to map for the input to search bar
  $scope.addMarkerGeo = function(location, map) {
    var marker = new google.maps.Marker({
      map: map,
      position: location,
      icon: './../img/green-dot.png',
      //map type
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    return marker;
  }

  // Get latitude and longitude coords from Address
  $scope.AddressToLocation = function(addressString, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': addressString}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('inside');
        callback(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  // Add marker while iterating through array of database results
  $scope.addMarker = function(obj, map) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(obj.lat,obj.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    return marker;
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


})

.controller('ListingCtrl', function($scope, $ionicModal){

  $scope.listings = [];

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function () {
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.addListing = function (data) {
    console.log('data is: ',data);
    $scope.listings.push({
      address: data.address,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      startTime: data.startTime,
      endTime: data.endTime,
      startHours: new Date(data.startTime).getUTCHours(),
      startMinutes: new Date(data.startTime).getUTCMinutes(),
      endHours: new Date(data.endTime).getUTCHours(),
      endMinutes: new Date(data.endTime).getUTCMinutes(),
      price: data.price
    });
    data.address = null;
    data.startDate = null;
    data.endDate = null;
    data.startTime = null;
    data.endTime = null;
    data.price = 0;
    $scope.closeModal();
  };

});








