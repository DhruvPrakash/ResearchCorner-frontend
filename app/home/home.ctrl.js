'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	
	/*-----This code here is to parse the cookie set by the server. A simple JSON.parse does not work which is why i have done this convoluted thing*/
	var cookie = $cookies.get('user_details');
	cookie = cookie.replace(/\\054/g, ','); // make that 054 into a ,
	
	var splitOn = cookie.split(',');
	var beforecomma = splitOn[0].slice(1) + '}'; //Add a } to make the first part look like an object. slice(1) removes the first character which is an extra "
	beforecomma = beforecomma.replace(/\\/g, ''); //replaces slashes
	var aftercomma = '{' + splitOn[1].slice(1, -1); // adds { before the second part. Removes first and last characters which are extra "
	aftercomma = aftercomma.replace(/\\/g, '');  // replaces slashes
	
	beforecomma = beforecomma.slice(1,-1);
	aftercomma = aftercomma.slice(1,-1);
	
	var result1parts = beforecomma.split(':');
	var result2parts = aftercomma.split(':');

	result1parts[0] = result1parts[0].slice(1,-1);
	result1parts[1] = result1parts[1].slice(1,-1).slice(1);
	
	result2parts[0] = result2parts[0].slice(1,-1);
	result2parts[1] = result2parts[1].slice(1,-1).slice(1);
	/*----------------------------------------------------------*/
	


	$scope.userInfo = {
		userName: (result1parts[0] === 'username') ? result1parts[1] : result2parts[1],
		group: (result1parts[0] === 'group') ? result1parts[1] : result2parts[1]
	};

	console.log($scope.userInfo.group);
}
