'use strict';

angular.module('mlrg.search')
	.controller('ViewSelectedBibsModalInstanceController', ViewSelectedBibsModalInstanceController);

	ViewSelectedBibsModalInstanceController.$inject = ['$scope', '$uibModalInstance'];

	function ViewSelectedBibsModalInstanceController($scope, $uibModalInstance){
		//$scope.selectedBibs = selectedBibs;

		//console.log($scope.selectedBibs);

		$scope.ok = function(){
			$uibModalInstance.close();
		};
	}