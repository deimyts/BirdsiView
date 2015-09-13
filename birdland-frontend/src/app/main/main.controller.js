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
    // vm.currentLocation = {};
    vm.position = {lat: 0, lng: 0};
    vm.test = 'Testing...';
    vm.showDetails = showDetails;
    vm.detailsTemplate = 'app/components/templates/bird-details.html';
    $scope.models = [];
    vm.windowOptions = {
      show: false,
      styles: styleArray,
      templateUrl: vm.detailsTemplate
    }

    var styleArray = [ 
      //any style array defined in the google documentation you linked
      {
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      },{
        featureType: "infoWindow",
        elementType: "geometry",
        stylers: [
          { hue: "#00ffee" },
          { saturation: 50 }
        ]
      },{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
    
    
    

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
          $scope.marker = vm.birds[0];
          // $scope.birds = vm.birds;
          console.log(data);
          
          mapBirds(vm.birds);
          return vm.birds;

        });
    }

    function showDetails() {
      vm.windowOptions.visible = !vm.windowOptions.visible;
    }

    function hideDetails() {
      vm.windowOptions.visible = false;
    }

    // Get user's location and load the map.
    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          $scope.$apply(function(){
                  vm.position = position;
                  vm.map = { center: { latitude: vm.position.lat, longitude: vm.position.lng }, zoom: 8 };
                });
        }, function() {
          handleLocationError(true)
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false)
      }
    }

    function mapBirds(birds) {
      console.log('mapping birds: ', birds);
      // for(i=0; i++; i<birds.length) {
      //   vm.marker = {

      //   }  
      // }
      
    }

    uiGmapGoogleMapApi.then(function(maps) {
        console.log('google maps ready');
        getCurrentLocation();
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
