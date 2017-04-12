'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	//var cookie = $cookies.getObject('user_details');
	var cookie1 = $cookies.get('user_details');
	cookie1 = cookie1.replace(/\\054/g, ',');
	var splitOn = cookie1.split(',');
	console.log('split on:');
	console.log(splitOn);
	//console.log(cookie);
	//console.log(newTemp);
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
