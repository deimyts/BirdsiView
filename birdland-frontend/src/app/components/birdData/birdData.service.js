(function() {
  'use strict';

  angular
    .module('birdland')
    .factory('birdData', birdData);

  /** @ngInject */
  function birdData($log, $http) {

    var apiHost = '../../assets/sample_data/reports.json';

    var service = {
      apiHost: apiHost,
      getBirds: getBirds,
      saveReport: saveReport
    };

    return service;

    function getBirds() {
      
      //may want to be sure that the api uses the location data to query the database, so you aren't getting all the birds at once!

      return $http.get(apiHost)
        .then(getBirdsComplete)
        .catch(getBirdsFailed);

      function getBirdsComplete(response) {
        var birds = response.data.birds;

        for ( var i=0; i < birds.length; i++  ){
          birds[i].id = birds[i]._id;
          birds[i].coords = { latitude: birds[i].lat, longitude: birds[i].long }
          console.log('birds[i]: ', birds[i].coords);

        }

        return birds;
      }

      function getBirdsFailed(error) {
        $log.error('XHR Failed for getBirds.\n' + angular.toJson(error.data, true));
      }
    }

    function saveReport(report) {
      console.log('saving bird report');
      return $http.post(report).then()
    }
  }
})();

// return {
//         getAvengers: getAvengers
//     };

//     function getAvengers() {
//         return $http.get('/api/maa')
//             .then(getAvengersComplete)
//             .catch(getAvengersFailed);

//         function getAvengersComplete(response) {
//             return response.data.results;
//         }

//         function getAvengersFailed(error) {
//             logger.error('XHR Failed for getAvengers.' + error.data);
//         }
//     }
