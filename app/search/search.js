'use strict';

//TODO: Define the search contract
//TODO: Verify this search contract syntax and semantics.
//TODO: Remove this mock (success, failure) when done from inject array, from function param
//TODO: Remove $q later from inject array, from function param, from search function
//TODO: Remove the random success failure!
require('./search-mock');
angular.module('mlrg.search')
	.factory('SearchBib', SearchBib);

	SearchBib.$inject = ['$http'/*, 'SearchMockSuccess1','SearchMockSuccess2','SearchMockFailure','$q'*/];

	function SearchBib($http/*, SearchMockSuccess1, SearchMockSuccess2, SearchMockFailure, $q*/){
		


		var search = function(searchParams){
			return $http.get('/api/search/',{
				"metadata" : {
					"page" : searchParams.page
				},
				"payload" : {
					'searchQuery': searchParams.searchText,
					}
				});
			

			//TODO: The following commented out code essentially function as stubs. Remove it later.
			// var def = $q.defer();
			// var randomBoolean = Math.random() >= 0.5;
			//return randomBoolean ? $q.resolve(SearchMockSuccess1) : $q.reject(SearchMockFailure);
		
			// return searchParams.page == 1 ? $q.resolve(SearchMockSuccess1) : $q.resolve(SearchMockSuccess2)
		
			//return $q.reject(SearchMockFailure);
		};


		var searchObj = {
			search: search
		};

		return searchObj;
	}