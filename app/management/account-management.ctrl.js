'use strict';

angular.module('mlrg.management')
    .controller('AccountManagementController', AccountManagementController);

AccountManagementController.$inject = ['$scope','SweetAlert','User'];


function AccountManagementController($scope, SweetAlert, User) {
	

	$scope.changePass = function(){
		User.changePass($scope.newPass).then(function(){

		}, function(){
			SweetAlert.swal('Error! Password not changed','','warning');
		});
	};
}
