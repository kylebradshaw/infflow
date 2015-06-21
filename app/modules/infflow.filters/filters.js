// http://stackoverflow.com/questions/15136504/using-filters-with-directives-in-angularjs
// http://stackoverflow.com/questions/20357156/how-to-output-html-from-a-filter-in-angular
(function(){
  'use strict';

  angular
      .module('infflow.filters')
      .filter('processTwitterText', ProcessTwitterText);

  ProcessTwitterText.$inject = ['$sce'];

  function ProcessTwitterText ($sce) {
    return function (input) {
      console.log(input, 'THEINPUT');
      if (input !== undefined) {
        return $sce.trustAsHtml(input.parseURL().parseUsername().parseHashtag());
      }
    }
  }

}());
