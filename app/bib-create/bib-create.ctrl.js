'use strict';


angular.module('mlrg.bibcreate')
	.controller('BibCreateController',BibCreateController);

	BibCreateController.$inject = ['$scope', '$state'];


	function BibCreateController($scope, $state){
		

		$scope.mainTab = {
			selectedTab: 'add'
		};


		$scope.changeMainTab = function(selectedTab){
			$scope.mainTab.selectedTab = selectedTab;
		};


	}
