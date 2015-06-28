(function(){
  'use strict';

  angular
      .module('infflow.hashwall', ['infflow.filters'])
      .controller('HashwallController', HashwallController);

  HashwallController.$inject = ['$scope', '$location', '$timeout', 'ipService',
      'twitterService', '$filter'];

  function HashwallController($scope, $location, $timeout, ipService,
      twitterService, $filter) {

    var vm = this;
    var woeid = 23424977; //USA http://goo.gl/P8ycIH

    vm.ip = '0.0.0.0';
    vm.query = null;
    vm.trends = null;
    vm.tweets = null;
    vm.getQuery = getQuery;
    vm.geo = null;
    // vm.text = $filter('processTwitterText')("An emotional ad that gives props to single moms on Father's Day. http://t.co/SP6B0M2yyd");

    twitterService.getTrends(woeid).then(function(response){
        vm.trends = response[0].trends;
      }, function(error) {
        console.error(error);
      });

    function getQuery(search, count) {
      if (!search) {
        search = vm.query;
      }
      if (!count) {
        count = 20;
      }
      search = window.encodeURIComponent(search);
      twitterService.getQuery(search, count).then(function(response){
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
        // too long to resolve
        // ipService.getGeo().then(onGetGeoSuccess, onGetGeoError);
      }
    }

    function onGetIPError(response) {
      console.error(response);
    }

    // get geoJSON
    function onGetGeoSuccess (response) {

      //console.log(response, 'geosuccess');
    }

    function onGetGeoError (error) {
      console.error(error, 'fail');
    }

  }

}());
