(function(){
  'use strict';

  angular
      .module('infflow.hashwall', [])
      .controller('HashwallController', HashwallController);

  HashwallController.$inject = ['$scope', '$location', '$timeout', 'ipService',
      'twitterService'];

  function HashwallController($scope, $location, $timeout, ipService,
      twitterService) {

    var vm = this;
    var woeid = 23424977; //USA http://goo.gl/P8ycIH

    vm.ip = '0.0.0.0';
    vm.query = null;
    vm.trends = null;
    vm.tweets = null;
    vm.getQuery = getQuery;
    vm.geo = null;

    twitterService.getTrends(woeid).then(function(response){
        vm.trends = response[0].trends;
      }, function(error) {
        console.error(error);
      })

    function getQuery(search) {
      if (!search) {
        console.log(vm.query, 'exists?');
      }
      twitterService.getQuery(search).then(function(response){
        vm.tweets = response;
      }, function(error) {
        console.error(error);
      });
    }

    // talk to the IP service
    ipService.getIP().then(onGetIPSuccess, onGetIPError);

    function onGetIPSuccess(response) {
      var ipRx = /(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/gim;
      vm.ip = response.data.match(ipRx)[0];
      if (vm.ip) {
        ipService.getGeo().then(onGetGeoSuccess, onGetGeoError);
      }
    }

    function onGetIPError(response) {
      console.error(response);
    }

    // get geoJSON
    function onGetGeoSuccess (response) {

      console.log(response, 'geosuccess');
    }

    function onGetGeoError (error) {
      console.error(error, 'fail');
    }

  }

}());
