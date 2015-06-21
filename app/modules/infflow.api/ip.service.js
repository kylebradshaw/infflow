(function(){
  'use strict';

  angular
      .module('infflow.api')
      .factory('ipService', ipService);

  ipService.$inject = ['$http', 'IP_URL'];

  function ipService($http, IP_URL) {

    var service = {
      getIP: getIP
    };

    return service;

    function getIP() {
      return $http.get(IP_URL);
    }

  }

}());
