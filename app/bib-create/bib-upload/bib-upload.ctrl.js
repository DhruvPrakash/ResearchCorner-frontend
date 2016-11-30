'use strict';

require('./file-upload');
angular.module('mlrg.bibcreate')
	.controller('BibUploadController',BibUploadController);

	BibUploadController.$inject = ['$scope','FileUpload','SweetAlert'];


	function BibUploadController($scope, FileUpload, SweetAlert){
		
		//Todo: Validate the thing to ensure only bibs are uploaded
		//How to show success and errors? Look for a component to do that
		$scope.upload = function(){
			//console.log($scope.files[0].name.slice(-4) === '.bib');
			FileUpload.uploadBibFile($scope.files[0]).then(function(){
				SweetAlert.swal("Bib File Has Been Uploaded");
			});
		};

	}
