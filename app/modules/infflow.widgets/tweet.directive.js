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
      replace: true
    };
    return directive;

    function link(scope, element, attrs){
      var twt = scope.vm.twt;
      var $el = $(element);
      var $tweet = $(element).find('> div');
      var randomInt =  Math.floor(Math.random() * 100) + 1;
      var pos = getPos();
      var magic = 2.8;
      var secret = Math.log10(twt.favorite_count + twt.retweet_count + twt.user.followers_count);
      var scale = getScale();
      var zIndex = Math.round(1000 * scale);

      function getScale() {
        var ret = secret / magic;
        console.log(ret, 'tweet scale', twt.favorite_count, twt.retweet_count, twt.user.followers_count);
        return (ret > 0) ? ret : 1;
      }

      function getPos() {
        console.log('random Int', randomInt);
        return randomInt + '%';
      }

      function runAnimation() {
        $el.addClass('run-animation');
        $el.css({
          left: pos,
          zIndex: zIndex
        });
      }

      //if it's the first, no timeout, else -> random
      window.setTimeout(runAnimation, randomInt * 500);

      //save z-index for later
      $el.data('zIndex', zIndex);

      $tweet.css({
        transform: 'scale('+scale+')',
        // fontSize: scale,
        // width: scale * 1.1,
        // height: scale * 1.1,
        // opacity: Math.random()
      })
      .draggable(); //jQuery UI

      $tweet.on('mouseenter', function() {
        $tweet.addClass('inspection');
        $el.css({zIndex: 9999999});
        $(this).parent().addClass('pause');
        $(this).parent().on('animationEnd', function() {
          this.style.animationPlayState = "paused";
        });
      }).on('mouseleave', function() {
        $tweet.removeClass('inspection');
        $el.css({zIndex: $el.data('zIndex')});
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

      $tweet.find('.tweet-close').on('click', function() {
        $tweet.remove();
      });

      // console.log(scope, element, attrs, 'tweet');
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
