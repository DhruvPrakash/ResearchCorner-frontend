'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	var cookie = $cookies.get('user_details');
	cookie = cookie.replace(/\\054/g, ',');
	console.log(cookie);
	cookie = JSON.parse(cookie);
	console.log(cookie);
	console.log(cookie.username);
	//console.log(JSON.parse(cookie));
	//console.log(JSON.parse(cookie).username);
	//console.log(JSON.parse(cookie)["group"]);
	$scope.userInfo = {
		userName: cookie.username,
		group: cookie.group
	};
	//console.log(JSON.parse(cookie));
}
