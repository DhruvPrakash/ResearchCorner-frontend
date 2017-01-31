'use strict';

angular.module('mlrg.search')
	.controller('SearchFilterModalInstanceController', SearchFilterModalInstanceController);

	SearchFilterModalInstanceController.$inject = ['$scope', 'activeFilters', '$uibModalInstance', 'SweetAlert'];

	function SearchFilterModalInstanceController($scope, activeFilters, $uibModalInstance, SweetAlert){
		$scope.activeFilters = activeFilters;

		/*Assumptions if from year is not given but to year is given then you will fetch the papers from the beginning of time to the given year*/

		/*If from year is given but to year is not then you will get the papers from the given year to the current year*/

		/*If both are given to be the same year then you will get only that year*/

		/*Authors field is only single or multi?*/


		$scope.availableTypes = [
			{ id: '0', name: 'All Types'},
	        { id: '1', name: 'Article' },
	        { id: '2', name: 'InProceedings' },
	        { id: '3', name: 'InBook' },
	        { id: '4', name: 'MasterThesis' },
	        { id: '5', name: 'Unpublished' },
	        { id: '6', name: 'Manual' },
	        { id: '7', name: 'Book' },
	        { id: '8', name: 'Booklet' },
	        { id: '9', name: 'Conference' },
	        { id: '10', name: 'Proceedings' },
	        { id: '11', name: 'InCollection' },
	        { id: '12', name: 'PhdThesis' },
	        { id: '13', name: 'TechReport' },
	        { id: '14', name: 'Misc' },
    	];

		$scope.activeFilters.fromYear = ($scope.activeFilters.year !== null) ? $scope.activeFilters.year.split('|')[0] : null;
		$scope.activeFilters.toYear = ($scope.activeFilters.year !== null) ? $scope.activeFilters.year.split('|')[1] : null;

		var makeEmptyNull = function(){
			angular.forEach($scope.activeFilters, function(value, key, obj) {
			    if (value === '' || value === undefined) {
			    	obj[key] = null;
			    }
			});
		};


		var validateDate = function(){
			var invalid = false;
			var minYear = 1800;
			var maxYear = new Date().getFullYear();

			if($scope.activeFilters.fromYear.length !== 4 || $scope.activeFilters.toYear.length !== 4) {
				invalid = true;
			}

			if(isNaN(+$scope.activeFilters.fromYear) || isNaN(+$scope.activeFilters.toYear)) {
				invalid = true;
			} else if(+$scope.activeFilters.fromYear > +$scope.activeFilters.toYear){
				invalid = true;
			} else if (+$scope.activeFilters.fromYear < minYear || +$scope.activeFilters.fromYear > maxYear) {
				invalid = true;
			} else if(+$scope.activeFilters.toYear < minYear || +$scope.activeFilters.toYear > maxYear){
				invalid = true;
			}

			return invalid;
		};

		var checkDatesFilledStatus = function(){
			var filledCombination = 'none';
			if($scope.activeFilters.fromYear !== null && $scope.activeFilters.toYear === null) {
				filledCombination = 'one';
			}
			if($scope.activeFilters.toYear !== null && $scope.activeFilters.fromYear === null) {
				filledCombination = 'one';
			}
			if($scope.activeFilters.toYear !== null && $scope.activeFilters.fromYear !== null) {
				filledCombination = 'both';
			}
			return filledCombination;
		};

		$scope.applyFilter = function(){
			var invalidDate, datesFilledStatus;
			makeEmptyNull();
			
			datesFilledStatus = checkDatesFilledStatus();
			if(datesFilledStatus === 'one') {
				SweetAlert.swal('', 'Please fill both date fields or none!', 'error');
				return;
			} else if(datesFilledStatus === 'both'){
				invalidDate = validateDate();
				if(invalidDate) {
					SweetAlert.swal('','The years entered are invalid. Please ensure that a 4 digit numeric year after 1800 and before the current year are entered.');
					return;
				}
				$scope.activeFilters.year = $scope.activeFilters.fromYear + '|' + $scope.activeFilters.toYear;
			} else {
				$scope.activeFilters.year = null;
			}
			$uibModalInstance.close($scope.activeFilters);
		};

		$scope.clearFilter = function(){
			$scope.activeFilters.fromYear = null;
			$scope.activeFilters.toYear = null;
			$scope.activeFilters.author = null;
			$scope.activeFilters.journal = null;
			$scope.activeFilters.selectedType = $scope.availableTypes[0];
		};

		$scope.cancel = function(){
			$uibModalInstance.dismiss();
		};

	}