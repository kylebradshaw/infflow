(function() {
  'use strict';

  angular
      .module('infflow.api')
      .factory('twitterService', twitterService);

  twitterService.$inject = ['$q', '$location', 'OAUTH_ID'];

  function twitterService($q, $location, OAUTH_ID) {

    var auth = false;

    var service = {
      init: init,
      onReady: onReady,
      connect: connect,
      clearCache: clearCache,
      getTweets: getTweets,
      getTrends: getTrends
    };

    return service;

    function init() {
      OAuth.initialize(OAUTH_ID, { cache: true });
      auth = OAuth.create('twitter');
    }

    function onReady() {
      return auth;
    }

    function connect() {
      var d = $q.defer();
      OAuth.popup('twitter', { cache: true }, function(error, result){
        if (!error) {
          auth = result;
          d.resolve();
        }
      })
      return d.promise;
    }

    function clearCache() {
      OAuth.clearCache('twitter');
      auth = false;
    }

    function getTweets() {
      console.log('TWEET!!');
    }

  }

}());
