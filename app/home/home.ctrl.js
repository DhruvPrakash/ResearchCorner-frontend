'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	//var cookie = $cookies.getObject('user_details');
	var cookie1 = $cookies.get('user_details');
	cookie1 = cookie1.replace(/\\054/g, ',');
	var splitOn = cookie1.split(',');
	//console.log('split on:');
	//console.log(splitOn);
	var result1 = splitOn[0].slice(1) + '}';
	result1 = result1.replace(/\\/g, '');
	var result2 = '{' + splitOn[1].slice(1, -1);
	result2 = result2.replace(/\\/g, '');
	
	result1 = result.slice(1,-1);
	result2 = result.slice(1,-1);
	console.log(result1);
	console.log(result2);

	var result1parts = result1.split(':');
	var result2parts = result2.split(':');

	console.log(result1parts);
	console.log(result2parts);

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
