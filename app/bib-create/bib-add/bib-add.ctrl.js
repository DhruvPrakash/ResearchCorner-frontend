'use strict';


require('./bib');
angular.module('mlrg.bibcreate')
	.controller('BibAddController',BibAddController);

	BibAddController.$inject = ['$scope', 'Bib', '$state'];


	function BibAddController($scope, Bib, $state){
		

		$scope.bib = {
			availableTypes: Bib.getAvailableTypes(),
			selectedType: Bib.getSelectedType(),
			selectedTab: Bib.getSelectedTab(),
			bibFields: Bib.getBibFields()
		};

		
		$scope.resetTab = function(){
			$scope.bib.selectedTab = 'required';
		};

		$scope.changeBibAddTab = function(selectedTab){
			$scope.bib.selectedTab = selectedTab;
			$state.go('home.createBib.addBib.types');
		};

		$scope.save = function(){
			$scope.bib.bibFields.metadata.type = $scope.bib.selectedType.name.toLowerCase();
			Bib.addBib($scope.bib.bibFields);
		}


	}
