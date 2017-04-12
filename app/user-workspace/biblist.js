'use strict';

angular.module('mlrg.userworkspace')
    .factory('BibList', BibList);

BibList.$inject = ['$http',/* '$q', '$timeout'*/];

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
		// 		         "bibListName":"Machine learning biblist"
		// 		      },
		// 		      {
		// 		         "owner_id":25,
				         
		// 		         "id":2,
		// 		         "bibListName":"Psychology psycosocial biblist"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
				      	
		// 		      	"id": 3,
		// 		      	"bibListName": "Pedagogy of grammer biblist"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
				      	
		// 		      	"id": 4,
		// 		      	"bibListName": "lt surge's pokemon biblist"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
				      	
		// 		      	"id": 5,
		// 		      	"bibListName": "Justice league biblist"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
				      	
		// 		      	"id": 6,
		// 		      	"bibListName": "Assignments not corrected by professor Aravindan biblist"
		// 		      },
		// 		      {
		// 		      	"owner_id": 25,
				      	
		// 		      	"id": 7,
		// 		      	"bibListName": "Vandala and animals biblist"
		// 		      }
		// 		   ]
		// 		}
		// 	}
		// },2000);
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
		// },1000);
			
		return $http.post('/api/getbiblists/', metadataObj);
	};

	var getSharedByMe = function(pageNo) {
		var metadataObj = {
			'metadata' : {
				'operationType': null,
				'page': null
			}
		};
		metadataObj.metadata.operationType = '1';
		metadataObj.metadata.page = pageNo;
		// return $timeout(function(){
		// 	return {
		// 		'data': {
		// 			'data': [
		// 				{
		// 					 "username":"adivandhya@gmail.com",
		// 					 "id":2,
		// 					 "bibListName":"ABC"
		// 				},
		// 				{
		// 					 "username":"adivandhya",
		// 					 "id":1,
		// 					 "bibListName":"ABC"
		// 				},
		// 				{
		// 					"username": "cowman",
		// 					"id":900,
		// 					"bibListName": "cowman's bibs"
		// 				}
		// 			]
		// 		}
		// 	}
		// });
		return $http.post('/api/getbiblists/', metadataObj);
	};
   
    var fetchLists = function(){
    	var pageNo = 0;
        var myLists = getMyLists(pageNo);
        var sharedWithMe = getSharedWithMe(pageNo);
        

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
    				'bibListName' : listName.bibListName,
    				'operationType': '0'
    			},
    			'data' : {
    				'bibIds': bibIds
    			}
    		});
    	});

    	return $q.all(listPromises);
    };

    var getBibItemsInList = function(listId){

    	return $http.get('/api/getbibitems/?bibListId='+listId);

    	// return $timeout(function(){
    	// 	return {
    	// 		'data': {
    	// 			'data': [
    	// 			{
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Data mining;Data models;Decision making;Market research;Technological innovation;Training data;Urban areas;Data Mining;Data Preprocessing;Direct Discrimination;Discrimination Prevention;Rule Generalization;Rule Protection",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 390,
			  //           "author": "T. A. Aneyrao and R. A. Fadnavis",
			  //           "timeStamp": "",
			  //           "pages": "1-4",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 World Conference on Futuristic Trends in Research and Innovation for Social Welfare (Startup Conclave)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Analysis for data preprocessing to prevent direct discrimination in data mining",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
     //    			},{
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Data mining;Data models;Distributed databases;Itemsets;Real-time systems;Sparks;dynamic data;incremental mining;real time;streaming data mining",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 391,
			  //           "author": "Jingxin Du and Jun Zhou and Chang Li and Lin Yang",
			  //           "timeStamp": "",
			  //           "pages": "331-335",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 3rd International Conference on Informative and Cybernetics for Computational Social Systems (ICCSS)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/ICCSS.2016.7586476",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "An overview of dynamic data mining",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Biological neural networks;Computer architecture;Data mining;Neurons;Support vector machines;Training;Tuning;GMDH;LS-SVM;computational intelligence;data stream mining;deep learning",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 392,
			  //           "author": "Y. Bodyanskiy and O. Vynokurova and I. Pliss and G. Setlak and P. Mulesa",
			  //           "timeStamp": "",
			  //           "pages": "257-262",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 IEEE First International Conference on Data Stream Mining Processing (DSMP)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/DSMP.2016.7583555",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Fast learning algorithm for deep evolving GMDH-SVM neural network in data stream mining tasks",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Adaptation models;Adaptive systems;Computational modeling;Data mining;Heuristic algorithms;Mathematical model;Robustness;adaptive robust model;data stream mining;nonstationary systems identification;on-line mode",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 393,
			  //           "author": "Y. Bodyanskiy and O. Vynokurova and Z. Szyma\\u0144ski and I. Kobylin and O. Kobylin",
			  //           "timeStamp": "",
			  //           "pages": "263-268",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 IEEE First International Conference on Data Stream Mining Processing (DSMP)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/DSMP.2016.7583556",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Adaptive robust models for identification of nonstationary systems in data stream mining tasks",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "computational complexity;data mining;field programmable gate arrays;storage management;FIM-DS;FPGA;approximate frequent itemset mining;computation complexity;data streaming;hardware accelerator design;space-saving-based approximate algorithm;Acceleration;Field programmable gate arrays;Itemsets;Pipelines;Table lookup",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 394,
			  //           "author": "Yubin Li and Yuliang Sun and Guohao Dai and Qiang Xu and Yu Wang and Huazhong Yang",
			  //           "timeStamp": "",
			  //           "pages": "1-4",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 26th International Conference on Field Programmable Logic and Applications (FPL)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/FPL.2016.7577331",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Approximate Frequent Itemset Mining for streaming data on FPGA",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Linux;data mining;power engineering computing;smart power grids;Apache Spark;Jiangsu province;Jupyter Notebook;JupyterHub;K-means clustering;Linux;data mining;multiple-user server;smart grids;Big data;Computer architecture;Data mining;Kernel;Servers;Smart grids;Sparks;Jupyter;Spark;big data;data mining;scalable;smart grid",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 395,
			  //           "author": "Adivandhya B R",
			  //           "timeStamp": "",
			  //           "pages": "1-5",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 China International Conference on Electricity Distribution (CICED)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/CICED.2016.7576117",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Scalable and cooperative big data mining platform design for smart grid",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "batch processing (industrial);data analysis;data mining;least mean squares methods;principal component analysis;MPCA;MPLS;batch process control optimization;batch process data analysis;batch process modelling;batch-to-batch difference;chemical reaction initiation status decision;control strategy optimization;data mining applications;data pretreatment;golden batch benchmark;information compression;multiway partial least squares;multiway principal component analysis;Batch production systems;Benchmark testing;Multiprotocol label switching;Process control;Synchronization;Temperature measurement;Valves",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 396,
			  //           "author": "Y. Su and F. Yu",
			  //           "timeStamp": "",
			  //           "pages": "1058-1063",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 12th World Congress on Intelligent Control and Automation (WCICA)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/WCICA.2016.7578815",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Data mining applications for finding golden batch benchmarks and optimizing batch process control",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Big data;Communication systems;Computational modeling;Data mining;Data models;Pipelines;Servers;Big data mining;Incremental data;Iterative computation",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 383,
			  //           "author": "P. Joseph and J. C. M. J. Pamila",
			  //           "timeStamp": "",
			  //           "pages": "1-5",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 3rd International Conference on Advanced Computing and Communication Systems (ICACCS)",
			  //           "journal": "",
			  //           "volume": "01",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/ICACCS.2016.7586377",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Survey on incremental and iterative models in big data mining environment",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Clinical trials;Conferences;Data mining;Diseases;Drugs;Market research;Clinical Data mining;adverse event;clinical pharmacology;pharmacovigilance;psychiatric adverse reaction",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 384,
			  //           "author": "S. Viveka and B. Kalaavathi",
			  //           "timeStamp": "",
			  //           "pages": "1-3",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 World Conference on Futuristic Trends in Research and Innovation for Social Welfare (Startup Conclave)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/STARTUP.2016.7583945",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Review on clinical data mining with psychiatric adverse drug reaction",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }, {
			  //           "comment": "",
			  //           "series": "",
			  //           "abstract": "",
			  //           "number": "",
			  //           "month": "",
			  //           "keywords": "Correlation;Data mining;Fetal heart rate;Pathology;Predictive models;Pregnancy;Radio frequency",
			  //           "file": "",
			  //           "year": "2016",
			  //           "owner": "",
			  //           "id": 385,
			  //           "author": "G. Magenes and R. Bellazzi and A. Malovini and M. G. Signorini",
			  //           "timeStamp": "",
			  //           "pages": "916-919",
			  //           "note": "",
			  //           "editor": "",
			  //           "type": "inproceedings",
			  //           "bookTitle": "2016 38th Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC)",
			  //           "journal": "",
			  //           "volume": "",
			  //           "address": "",
			  //           "institution": "",
			  //           "chapter": "",
			  //           "publisher": "",
			  //           "school": "",
			  //           "doi": "10.1109/EMBC.2016.7590850",
			  //           "edition": "",
			  //           "url": "",
			  //           "title": "Comparison of data mining techniques applied to fetal heart rate parameters for the early identification of IUGR fetuses",
			  //           "howPublished": "",
			  //           "organization": "",
			  //           "markedEntry": "",
			  //           "crossRef": ""
			  //       }]
    	// 		}
    	// 	}
    	// },1000);
    };

    var shareList = function(bibListId, userIds){
    	return $http.post('/api/sharebiblist/', {
    		'metadata': {
    			
    		},
    		'data' : {
    			'bibListId': bibListId,
    			'userids' : userIds
    		}
    	});
    }

    var getBibListsByBib = function(bibId){
    	return $http.get('/api/bibitemtobiblistlookup/?bibId='+bibId).then(function(result){
    		return result.data.data.map(function(list){
    			return list.bibListName;
    		});
    	});
    };

    var bibListObj = {
        fetchLists: fetchLists,
        createList: createList,
        updateList: updateList,
        getMyLists: getMyLists,
        getSharedWithMe: getSharedWithMe,
        getBibItemsInList: getBibItemsInList,
        getSharedByMe: getSharedByMe,
        shareList: shareList,
        getBibListsByBib: getBibListsByBib
    };

    return bibListObj;
}
