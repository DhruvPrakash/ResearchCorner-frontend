'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	var cookie = $cookies.get('user_details');
	cookie = cookie.replace(/\\054/g, ',');
	console.log(cookie);
	console.log(JSON.parse(cookie));
	$scope.userInfo = {
		userName: JSON.parse(cookie).username,
		group: JSON.parse(cookie).group
	};
	//console.log(JSON.parse(cookie));
}
