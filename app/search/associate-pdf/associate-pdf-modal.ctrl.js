'use strict';

require('../../bib-create/bib-upload/file-upload');

angular.module('mlrg.search')
    .controller('AssociatePDFtInstanceController', AssociatePDFtInstanceController);

AssociatePDFtInstanceController.$inject = ['$scope', 'bib', '$uibModalInstance', 'SweetAlert', 'FileUpload'];

function AssociatePDFtInstanceController($scope, bib, $uibModalInstance, SweetAlert, FileUpload) {
    $scope.bibId = bib.id;

    $scope.upload = function() {
    	
    	if($scope.files === undefined) {
    	    SweetAlert.swal('Please select a bib file', '', 'warning');
    	    return;
    	}

    	if ($scope.files[0].name.slice(-3) === 'pdf') {
    		FileUpload.sayHi();
    		SweetAlert.swal('The file has been uploaded. It will be associated with the selected bib shortly', '', 'success');
    		$scope.ok();
    	} else {
    		SweetAlert.swal('Please upload a pdf file', '', 'warning');
    	}    	
    };

    $scope.ok = function() {
        $uibModalInstance.close();
    };
}
