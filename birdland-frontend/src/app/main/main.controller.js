(function() {
  'use strict';

  angular
    .module('birdland')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(birdData) {
    var vm = this;

    // variables
    vm.birds = {};

    //do stuff
    sampleFunction();

    vm.birds = birdData.getBirds();
    
    

    //functions
    function sampleFunction() {

    }
    
  }
})();
