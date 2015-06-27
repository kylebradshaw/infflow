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
        twt: '='
      },
      templateUrl: 'modules/infflow.widgets/tweet.template.html',
      bindToController: true,
      controller: TweetController,
      controllerAs: 'vm',
      // transclude: true
      replace: true
    };
    return directive;

    function link(scope, element, attrs){
      var twt = scope.vm.twt;
      var scale = getScale();
      var $el = $(element);
      var $tweet = $(element).find('> div');
      var randomInt =  Math.floor(Math.random() * 100) + 1;
      var pos = getPos();

      function getScale() {
        var scale = Math.log10(twt.favorite_count + twt.retweet_count + twt.user.followers_count) / 3;
        return (scale > 0) ? scale : 1;
      }

      function getPos() {
        return randomInt + '%';
      }

      function runAnimation() {
        $el.addClass('run-animation');
        console.log('right', pos);
        $el.css({
          left: pos
        });
      }

      window.setTimeout(runAnimation, randomInt * 500);

      $tweet.css({
        transform: 'scale('+scale+')',
        // fontSize: scale,
        // width: scale * 1.1,
        // height: scale * 1.1,
        zIndex: Math.round(1000 * scale),
        // opacity: Math.random()
      });

      $tweet.on('mouseenter', function() {
        $(this).parent().addClass('pause');
        $(this).parent().on('animationEnd', function() {
          this.style.animationPlayState = "paused";
        });
      }).on('mouseleave', function() {
        if (!$(this).parent().hasClass('clicked')) {
          $(this).parent().removeClass('pause');
          return;
        }
      }).on('click', function() {
        if ($(this).parent().hasClass('clicked')) {
          $(this).parent().removeClass('clicked pause');
          return;
        }
        $(this).parent().addClass('clicked pause');
        $(this).parent().on('animationEnd', function() {
          this.style.animationPlayState = "paused";
        });
      });

      console.log(scope, element, attrs, 'tweet');
    }

  }

  TweetController.$inject = ['$scope', '$window', '$filter'];

  function TweetController($scope, $window, $filter) {
    var vm = this;

    vm.passMustard = passMustard;
    vm.goTweet = goTweet;
    vm.twt.linkedText = $filter('processTwitterText')(vm.twt.text);
    // console.log(vm.twt.text, vm.twt.linkedText);??

    function passMustard() {
      if (vm.twt.user.profile_image_url && vm.twt.user.followers_count > 10) {
        return true;
      }
    }

    function goTweet(type, item) {
      var url = 'https://twitter.com/intent/';
      var id = item.id_str;

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
        case 'tweet':
          url = 'https://twitter.com/' + item.user.screen_name + '/' + id;
          break;
      }

      $window.open(url);
    }
  }

}());
