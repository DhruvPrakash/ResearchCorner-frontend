'use strict';

angular.module('mlrg.userworkspace')
    .factory('BibList', BibList);

BibList.$inject = ['$http', '$q'];

function BibList($http, $q) {

	var metadataObj = {
		'metadata' : {
			'operationType' : null,
			'page': 1 // TODO: Check if this should even be here!
		}
	};

	var getMyLists = function(){
		return $http.post('/api/getbiblists/', metadataObj)
	};

	var getSharedWithMe = function(){

	};
   
    var fetchLists = function(){
        var myLists = getMyLists();
        var sharedWithMe = getSharedWithMe();
        // return $http.post('/api/getbiblists/', {

        // });
    };


    var bibListObj = {
        fetchLists: fetchLists
    };

    return bibListObj;
}
