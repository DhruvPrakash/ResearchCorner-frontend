'use strict';

require('./bib');
angular.module('mlrg.bibcreate')
    .controller('BibAddController', BibAddController);

BibAddController.$inject = ['$scope', 'Bib', '$state', 'SweetAlert'];


function BibAddController($scope, Bib, $state, SweetAlert) {

    $scope.mode = ($state.current.name === 'editModal') ? 'edit' : 'add';
    $scope.files = null;

    $scope.bib = {
        availableTypes: Bib.getAvailableTypes(),
        selectedType: Bib.getSelectedType(),
        selectedTab: Bib.getSelectedTab(),
        bibFields: Bib.getBibFields()
    };

    if ($state.current.name === 'editModal') {
        $scope.bib.bibFields = Bib.getBibFieldsEditMode();
        $scope.bib.selectedType = Bib.getSelectedTypeEditMode();
    }

    $scope.resetTab = function() {
        $scope.bib.selectedTab = 'required';
    };


    $scope.clearFields = function() {
        $scope.files = null;
    };

    $scope.changeBibAddTab = function(selectedTab) {
        $scope.bib.selectedTab = selectedTab;
        if ($scope.mode === 'edit') {
            $state.go('editModal');
        } else {
            $state.go('home.createBib.addBib.types');
        }

    };

    $scope.save = function() {
        $scope.bib.bibFields.metadata.type = $scope.bib.selectedType.name.toLowerCase();
        $scope.bib.bibFields.metadata.operation = ($scope.mode === 'add') ? 'add' : 'edit';
        if ($scope.mode === 'edit') {
            $scope.bib.bibFields.metadata.id = $scope.bib.bibFields.payload.id;
        }

        $scope.reqtype = Bib.checkIfRequiredPresent($scope.bib.selectedType.name, $scope.bib.bibFields.payload);
        if (!$scope.reqtype) {
            SweetAlert.swal('Please fill all the fields', ' ', 'warning');
            return;
        }


        if ($scope.files !== null) {
            if ($scope.files[0].name.slice(-3) === 'pdf') {
                Bib.uploadPDFFile($scope.files[0], $scope.bib.bibFields.payload);
                SweetAlert.swal('The bib item along with the file are being added', '', 'success');
            } else {
                SweetAlert.swal('Please upload a PDF file', '', 'warning');
            }
        } else {
            Bib.addBib($scope.bib.bibFields, $scope.mode);
            SweetAlert.swal('The bib item is being added.', '', 'success');
        }


        if ($scope.mode === 'edit') {
            $scope.$dismiss();
        }
        //have a sweetalert here saying that the bib is being added
    };



}
