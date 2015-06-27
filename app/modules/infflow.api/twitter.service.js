(function() {
  'use strict';

  angular
      .module('infflow.api')
      .factory('twitterService', twitterService);

  twitterService.$inject = ['$q', '$location', 'OAUTH_ID'];

  function twitterService($q, $location, OAUTH_ID) {

    var auth = false;
    var OAuth = window.OAuth;

    var service = {
      init: init,
      onReady: onReady,
      connect: connect,
      clearCache: clearCache,
      getQuery: getQuery,
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
      });
      return d.promise;
    }

    function clearCache() {
      OAuth.clearCache('twitter');
      auth = false;
    }

    function getTrends(woeid) {
      var d = $q.defer();
      var promise = auth.get('/1.1/trends/place.json?&id='+woeid)
        .done(function(data){
          d.resolve(data);
        });
      return d.promise;
    }

    function getQuery(search, count) {
      // https://api.twitter.com/1.1/search/tweets.json
      var count = (count) ? count : 10;
      var d = $q.defer();
      var promise = auth.get('/1.1/search/tweets.json?count='+count+'&q='+search)
        .done(function(data){
          d.resolve(data);
        });
      return d.promise;
    }


  }

}());
