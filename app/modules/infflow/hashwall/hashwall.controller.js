(function(){
  'use strict';

  angular
      .module('infflow.hashwall', [])
      .controller('HashwallController', HashwallController);

  HashwallController.$inject = ['$scope', '$location', '$timeout'];

  function HashwallController($scope, $location, $timeout) {
    var vm = this;

    vm.message = "Where am I??";
  }

}());
