'use strict';

angular.module('mlrg.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$cookies','$scope'];


function HomeController($cookies, $scope) {
	var cookie = $cookies.get('user_details');
	$scope.userInfo = {
		userName: cookie.username,
		group: cookie.group
	};
}
