'use strict';

angular.module('mlrg.userworkspace')
    .factory('BibList', BibList);

BibList.$inject = ['$http', '$q'/*, '$timeout'*/];

function BibList($http, $q/*, $timeout*/) {


	var getMyLists = function(pageNo){
		var metadataObj = {
			'metadata' : {
				'operationType' : null,
				'page': null
			}
		};
		metadataObj.metadata.operationType = '0';
		metadataObj.metadata.page = pageNo;
		// return $timeout(function(){
		// 	return {
		// 		'data': {
   				
		// 		   'data':[
		// 		      {
		// 		         "owner_id":25,
		// 		         "id":1,
		// 		         "bibListName":"ABCee"
		// 		      },
		// 		      {
		// 		         "owner_id":25,
		// 		         "id":2,
		// 		         "bibListName":"EFG"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
		// 		      	"id": 3,
		// 		      	"bibListName": "available"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
		// 		      	"id": 4,
		// 		      	"bibListName": "lt surge"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
		// 		      	"id": 4,
		// 		      	"bibListName": "lt SURGEE"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
		// 		      	"id": 4,
		// 		      	"bibListName": "Chesire"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
		// 		      	"id": 4,
		// 		      	"bibListName": "Electabuzzzzzz"
		// 		      }
		// 		   ]
		// 		}
		// 	}
		// });
		return $http.post('/api/getbiblists/', metadataObj);
	};

	var getSharedWithMe = function(pageNo){
		var metadataObj = {
			'metadata' : {
				'operationType' : null,
				'page': null
			}
		};
		metadataObj.metadata.operationType = '2';
		metadataObj.metadata.page = pageNo;
		// return $timeout(function(){
		// 	return {
		// 		'data':{
		// 	   		'data':[
		// 		      	{
		// 		         "owner":"brucealmighty",
		// 		         "id":1,
		// 		         "bibListName":"ABC"
		// 		      	},
		// 		      	{
		// 		         "owner":"donaldthetrump",
		// 		         "id":3,
		// 		         "bibListName":"ABCD"
		// 		      	}
		// 	   		]
		// 		}
		// 	}
		// });
			
		return $http.post('/api/getbiblists/', metadataObj);
	};
   
    var fetchLists = function(){
    	var pageNo = 0;
        var myLists = getMyLists(pageNo);
        var sharedWithMe = getSharedWithMe(pageNo);
        
        //console.log('Before q.all');

        // return myLists.then(function(result){
        // 	console.log('inside the resolved promise');
        // 	return result.data.data;
        // });

        return $q.all([myLists, sharedWithMe]).then(function(results){
        	console.log('the result array is ');
        	console.log(results);
        	var result;
        	result = results[0].data.data.concat(results[1].data.data);
        	return result;
        });
    };


    var createList = function(listName, bibIds){
    	return $http.post('/api/createbiblist/', {
    		'metadata': {
    			'bibListName' : listName
    		},
    		'data' : {
    			'bibIds': bibIds
    		}
    	});
    };

    var updateList = function(lists, bibIds){
    	var listPromises = lists.map(function(listName) {
    		return $http.post('/api/updatebiblist/', {
    			'metadata': {
    				'bibListName' : listName,
    				'operationType': '0'
    			},
    			'data' : {
    				'bibIds': bibIds
    			}
    		});
    	});

    	return $q.all(listPromises);
    };

    var bibListObj = {
        fetchLists: fetchLists,
        createList: createList,
        updateList: updateList
    };

    return bibListObj;
}
