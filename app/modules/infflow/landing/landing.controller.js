(function(){
  'use strict';

  angular
      .module('infflow.landing', [])
      .controller('LandingController', LandingController);

  LandingController.$inject = ['$scope', '$location', '$timeout'];

  function LandingController ($scope, $location, $timeout) {

    var vm = this;

    vm.message = "Loose your shit!";
    vm.go = go;

    function go(where) {

      console.log(where, ' where');

      var dest = '/';

      switch (where) {
        case 'hashwall':
          dest = '/hashwall';
          break;
        default:
          break;
      }

      $timeout(function(){
        $location.path(dest);
      }, 0);

    }

  }

}());
