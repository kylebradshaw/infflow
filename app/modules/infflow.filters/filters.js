// http://stackoverflow.com/questions/15136504/using-filters-with-directives-in-angularjs
// http://stackoverflow.com/questions/20357156/how-to-output-html-from-a-filter-in-angular
// unsafe ex: http://plnkr.co/edit/B2ySXLjRQGbulXloPJRc?p=preview
(function() {
  'use strict';

  angular
    .module('infflow.filters')
    .filter('processTwitterText', ProcessTwitterText)
    .filter('UnsafeFilter', UnsafeFilter);

  ProcessTwitterText.$inject = ['$sce'];

  function ProcessTwitterText($sce) {
    return function(input) {
      return $sce.trustAsHtml(input.parseURL().parseUsername().parseHashtag());
    }
  }

  function UnsafeFilter($sce) {
    return $sce.trustAsHtml;
  }



}());
