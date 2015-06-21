(function(){
  'use strict';

  angular
      .module('infflow.lost', [])
      .controller('LostController', LostController);

  LostController.$inject = ['$scope', '$location', '$timeout'];

  function LostController($scope, $location, $timeout) {
    var vm = this;

    vm.message = "Where am I??";
  }

}());
