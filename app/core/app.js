(function() {
  'use strict';

  angular
    .module('infflow', [
      'ngRoute', 'ngAnimate', 'angular-loading-bar',
      'infflow.api', 'infflow.landing', 'infflow.filters',
      'infflow.lost', 'infflow.hashwall', 'infflow.config', 'infflow.widgets'
    ])
    .config(configure)
    .controller('MainController', MainController);

  configure.$inject = ['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider'];
  MainController.$inject = ['$route', '$routeParams', '$location', 'twitterService'];

  function configure($routeProvider, $locationProvider, cfpLoadingBarProvider) {
    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider
      .when('/', routeConfig('landing'))
      .when('/lost', routeConfig('lost'))
      .when('/hashwall', routeConfig('hashwall'))
      .otherwise({
        redirectTo: '/lost'
      })
  }

  function routeConfig(name) {
    var capitalName = name.charAt(0).toUpperCase() + name.substring(1);
    return {
      controller: capitalName + 'Controller',
      controllerAs: 'vm',
      templateUrl: 'modules/infflow/' + name + '/' + name + '.template.html'
    }
  }

  function MainController($route, $routeParams, $location, twitterService) {
    var main = this;

    main.connectButton = connectButton;
    main.signOut = signOut;
    main.go = go;
    main.signedIn = false;

    twitterService.init();

    function setSignIn(bool) {
      main.signedIn = bool;
    }

    function go(where) {

      var dest = '/';

      switch (where) {
        case 'hashwall':
          dest = '/hashwall';
          break;
        default:
          break;
      }

      $location.path(dest);

    }

    function connectButton () {
      twitterService.connect().then(function() {
        if (twitterService.onReady()) {
          $('#connectButton').prop('disabled', true);
          $('#hashWall').prop('disabled', false);
          $('#signOut').prop('disabled', false);
          setSignIn(true);
        }
      });
    }

    function signOut () {
      twitterService.clearCache();
      $('#connectButton').prop('disabled', false);
      $('#hashWall').prop('disabled', true);
      $('#signOut').prop('disabled', true);
      setSignIn(false);
      go();
    }

  }

}());
