(function () {
  'use strict';

  angular
    .module('core')
    .filter('toLowerCase', toLowerCase);

	 	function toLowerCase() {

		    return function(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			};
	}
}());

