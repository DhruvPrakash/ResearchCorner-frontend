'use strict';

angular.module('mlrg.management')
    .controller('AccountManagementController', AccountManagementController);

AccountManagementController.$inject = ['$scope','SweetAlert','User','$window'];


function AccountManagementController($scope, SweetAlert, User, $window) {
	

	$scope.changePass = function(){
		User.changePass($scope.newPass).then(function(){
			SweetAlert.swal('Password changed successfully!','','success');
			$window.reload();

		}, function(){
			SweetAlert.swal('Error! Password not changed','','warning');
		});
	};
}
