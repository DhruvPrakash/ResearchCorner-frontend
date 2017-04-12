'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	var cookie = $cookies.getObject('user_details');
	//cookie = cookie.replace(/\\054/g, ',');
	console.log(cookie);
	// cookie = JSON.parse(cookie);
	// console.log(cookie);
	// console.log(Object.values(cookie));
	//console.log(JSON.parse(cookie));
	// console.log(JSON.parse(cookie).username);
	//console.log(JSON.parse(cookie)["group"]);
	$scope.userInfo = {
		userName: 'researcher',
		group: 'Researcher'
	};
	//console.log(JSON.parse(cookie));
}
