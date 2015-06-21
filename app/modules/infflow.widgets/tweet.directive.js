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
      templateUrl: 'modules/infflow.widgets/tweet.template.html',
      bindToController: true,
      controller: TweetController,
      controllerAs: 'vm',
      // transclude: true
      replace: true
    }
    return directive;

    function link(scope, element, attrs){
      console.log(scope, element, attrs, 'tweet');
    }

  }

  TweetController.$inject = ['$scope', '$window'];

  function TweetController($scope, $window) {
    var vm = this;

    vm.passMustard = passMustard;
    vm.goTweet = goTweet;

    function passMustard() {
      if (vm.twt.user.profile_image_url && vm.twt.user.followers_count > 10) {
        return true;
      }
    }

    function goTweet(type, item) {
      var url = 'https://twitter.com/intent/';
      var id = item.id;

      switch(type) {
        case 'profile':
          url += 'user?screen_name=' + item.user.screen_name;
          break;
        case 'reply':
          url += 'tweet?in_reply_to=' + id;
          break;
        case 'retweet':
          url += 'retweet?tweet_id=' + id;
          break;
        case 'favorite':
          url += 'favorite?tweet_id=' + id;
          break;
        case 'follow':
          url += 'follow?tweet_id=' + id;
          break;
      }

      $window.open(url);
    }
  }

}());
