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
      
      return $http.get(apiHost)
        .then(getBirdsComplete)
        .catch(getBirdsFailed);

      function getBirdsComplete(response) {
        return response.data;
      }

      function getBirdsFailed(error) {
        $log.error('XHR Failed for getBirds.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
