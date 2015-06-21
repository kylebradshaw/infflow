(function(){
  'use strict';

  angular
      .module('infflow.landing', [])
      .controller('LandingController', LandingController);

  LandingController.$inject = ['$scope', '$location', '$timeout'];

  function LandingController ($scope, $location, $timeout) {

    var vm = this;

  }

}());
