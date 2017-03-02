'use strict';


require('./bib');
angular.module('mlrg.bibcreate')
	.controller('BibAddController',BibAddController);

	BibAddController.$inject = ['$scope', 'Bib', '$state', 'SweetAlert','FileUpload'];


	function BibAddController($scope, Bib, $state, SweetAlert,FileUpload){
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

		$scope.upload = function(){
			//FileUpload.uploadBibFile($scope.files[0]).then(function(){
		}
		

		 $scope.clearFields = function () {
    		$scope.files = null;
		};


		$scope.save = function(){
			
			$scope.reqtype=Bib.checkIfRequiredPresent($scope.bib.selectedType.name,$scope.bib.bibFields.payload);
			if(!$scope.reqtype){
				SweetAlert.swal('Please fill all the fields',' ','warning');
			}
			
			$scope.bib.bibFields.metadata.type = $scope.bib.selectedType.name.toLowerCase();
			//Bib.addBib($scope.bib.bibFields);
		}
				
			
		}
	
