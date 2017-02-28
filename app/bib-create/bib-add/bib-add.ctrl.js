'use strict';


require('./bib');
angular.module('mlrg.bibcreate')
    .controller('BibAddController', BibAddController);

BibAddController.$inject = ['$scope', 'Bib', '$state'];


function BibAddController($scope, Bib, $state) {

    $scope.mode = ($state.current.name === 'editModal') ? 'edit' : 'add';


    $scope.bib = {
        availableTypes: Bib.getAvailableTypes(),
        selectedType: Bib.getSelectedType(),
        selectedTab: Bib.getSelectedTab(),
        bibFields: Bib.getBibFields()
    };
    
    if($state.current.name === 'editModal') {
        $scope.bib.bibFields = Bib.getBibFieldsEditMode();
        $scope.bib.selectedType = Bib.getSelectedTypeEditMode();
    }

    $scope.resetTab = function() {
        $scope.bib.selectedTab = 'required';
    };

    $scope.changeBibAddTab = function(selectedTab) {
        $scope.bib.selectedTab = selectedTab;
        if($scope.mode === 'edit') {
            $state.go('editModal');
        } else {
            $state.go('home.createBib.addBib.types');
        }
        
    };

    $scope.save = function() {
        $scope.bib.bibFields.metadata.type = $scope.bib.selectedType.name.toLowerCase();
        $scope.bib.bibFields.metadata.operation = ($scope.mode === 'add') ? 'add' : 'edit';
        if($scope.mode === 'edit') {
            $scope.bib.bibFields.metadata.id = $scope.bib.bibFields.payload.id;
        }
        
        Bib.addBib($scope.bib.bibFields, $scope.mode);
        if($scope.mode === 'edit') {
            $scope.$dismiss();
        }
        //have a sweetalert here saying that the bib is being added
    };



}
