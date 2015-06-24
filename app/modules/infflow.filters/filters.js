// http://stackoverflow.com/questions/15136504/using-filters-with-directives-in-angularjs
// http://stackoverflow.com/questions/20357156/how-to-output-html-from-a-filter-in-angular
// unsafe ex: http://plnkr.co/edit/B2ySXLjRQGbulXloPJRc?p=preview
(function() {
  'use strict';

  angular
    .module('infflow.filters')
    .filter('processTwitterText', ProcessTwitterText);

  ProcessTwitterText.$inject = ['$sce'];

  function ProcessTwitterText($sce) {
    String.prototype.parseURL = function() {
        return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+.[A-Za-z0-9-_:%&~?/.=]+/g, function(url) {
            return url.link(url);
        });
    };
    String.prototype.parseUsername = function() {
        return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
            var username = u.replace("@","");
            return u.link("https://twitter.com/"+username);
        });
    };
    String.prototype.parseHashtag = function() {
        return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
            var tag = t.replace("#","");
            return t.link("https://twitter.com/hashtag/"+tag);
        });
    };
    return function(input) {
      if (input !== undefined) {
        console.log(input);
        var output = $sce.trustAsHtml(input.parseURL().parseUsername().parseHashtag());
        console.log(output);
        return output
      }
    }
  }

}());
