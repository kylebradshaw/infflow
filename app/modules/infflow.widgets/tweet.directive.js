/**
 * @desc falling twitter element
 * @example <div tweet></div>
 */

//https://github.com/johnpapa/angular-styleguide#directives-and-controlleras
(function(){
  'use strict';

  angular
      .module('infflow.widgets', ['infflow.filters'])
      .directive('tweet', tweetDirective);

  function tweetDirective() {
    var directive = {
      restrict: 'A',
      link: link,
      scope: {
        twt: '=',
        processTwitterText: '=filter'
      },
      transclude: true,
      templateUrl: 'modules/infflow.widgets/tweet.template.html',
      bindToController: true,
      controller: TweetController,
      controllerAs: 'vm'
    }
    return directive;

    function link(scope, element, attrs){
      console.log(scope, element, attrs, 'tweet');
    }

  }

  TweetController.$inject = ['$scope'];

  function TweetController($scope) {
    var vm = this;

  }

}());
