'use strict';

angular.module('mlrg.bibcreate')
	.factory('FileUpload', FileUpload);

	FileUpload.$inject = ['$http'];

	function FileUpload($http){
		

		var uploadBibFile = function(data){
			var formData = new FormData();
			formData.append('file', data);
			

			return $http.post('/api/uploadbibfile/', formData, {
			 	transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});
		};


		var uploadPDFFile = function(fileData, data, bibId){
			var formData = new FormData();
			formData.append('file', filedata);
			if(data !== null){
				formData.append('data', data);
			}
			if(data !== null) {
				return $http.post('/api/uploadbibfile/', formData, {
			 		transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			} else {
				return $http.post('/api/uploadbibfile/', formData, {
			 		transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			}			
		};

		var uploadObj = {
			uploadBibFile: uploadBibFile,
			uploadPDFFile: uploadPDFFile
		};

		return uploadObj;
	}