(function() {
  'use strict';

  angular
    .module('birdland')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, birdData, $log, uiGmapGoogleMapApi) {
    var vm = this;

    // variables
    vm.birds = [];
    // vm.initMap = initMap; 
    vm.test = 'Testing...';
    vm.showDetails = showDetails;
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    //do stuff
    activate();






    // vm.birds.push()

    console.log('BIRDS: ', vm.birds)
    // console.log('bird 1: ', vm.birds.value)




    //functions
    function activate() {
      return getBirds().then(function() {
        $log.info('Activated Birds!');
        
      });
    }

    function getBirds() {
      return birdData.getBirds()
        .then(function(data){
          vm.birds = data;
          console.log(data);
          return vm.birds;
        });
    }

    function showDetails() {
      console.log('some details');
    }

    uiGmapGoogleMapApi.then(function(maps) {
        console.log('google maps ready');
        });

    //map stuff

    // function initMap() {
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -30, lng: -97},
    //     zoom: 13
    //   });
    //   var infoWindow = new google.maps.InfoWindow({map: map});

    //   // Try HTML5 geolocation.
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       var pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };

    //       console.log('position: ', pos);

    //       infoWindow.setPosition(pos);
    //       infoWindow.setContent('Location found.');
    //       map.setCenter(pos);
    //     }, function() {
    //       handleLocationError(true, infoWindow, map.getCenter());
    //     });
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    //   }

    //   var myLatLng = {lat: 30.270525, lng: -97.736249};

    //   var marker = new google.maps.Marker({
    //       position: myLatLng,
    //       map: map,
    //       title: 'Hello World!'
    //     })
    // }

    // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //   infoWindow.setPosition(pos);
    //   infoWindow.setContent(browserHasGeolocation ?
    //                         'Error: The Geolocation service failed.' :
    //                         'Error: Your browser doesn\'t support geolocation.');
    // }
    
  }
})();
