'use strict';

angular.module('mlrg.bibcreate')
    .factory('FileUpload', FileUpload);

FileUpload.$inject = ['$http'];

function FileUpload($http) {


    var uploadBibFile = function(data) {
        var formData = new FormData();
        formData.append('file', data);


        return $http.post('/api/uploadbibfile/', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };


    var uploadPDFFile = function(fileData, data, bibId) {
        var formData = new FormData();
        formData.append('file', fileData);
        if (data !== null) {
            formData.append('metadata', data.metadata);
            formData.append('payload', data.payload);
        }
        if (data !== null) {
            return $http.post('/api/addbib/', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        } else {
            return $http.post('/api/addbib/' + bibId, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        }
    };

    var uploadObj = {
        uploadBibFile: uploadBibFile,
        uploadPDFFile: uploadPDFFile
    };

    return uploadObj;
}
