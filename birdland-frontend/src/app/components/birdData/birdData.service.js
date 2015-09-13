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
      getBirds: getBirds
    };

    return service;

    function getBirds() {
      
      //may want to be sure that the api uses the location data to query the database, so you aren't getting all the birds at once!
      
      return $http.get(apiHost)
        .then(getBirdsComplete)
        .catch(getBirdsFailed);

      function getBirdsComplete(response) {
        return response.data.birds;
      }

      function getBirdsFailed(error) {
        $log.error('XHR Failed for getBirds.\n' + angular.toJson(error.data, true));
      }
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
