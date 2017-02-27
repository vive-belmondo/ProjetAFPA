(function () {
  'use strict';

  angular
    .module('core')
    .filter('nothing', nothing);

 	function nothing() {

	    return function(string) {
			var stringInverse = "";
			for (i=0; i<string.length;i++){
				stringInverse = string[i] + stringInverse;
			}
			return stringInverse;
	    };
	}
}());