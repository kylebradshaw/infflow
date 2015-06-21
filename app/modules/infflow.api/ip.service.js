(function(){
  'use strict';

  angular
      .module('infflow.api')
      .factory('ipService', ipService);

  ipService.$inject = ['$http', 'IP_URL', 'GEO_URL'];

  function ipService($http, IP_URL, GEO_URL) {

    var service = {
      getIP: getIP,
      getGeo: getGeo
    };

    return service;

    function getIP() {
      return $http.get(IP_URL, { cache: true });
    }

    function getGeo(ipAddress) {
      return $http.jsonp(GEO_URL.replace(':ipAddress', ipAddress), { cache: true });
    }

  }

}());
