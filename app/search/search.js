'use strict';

//TODO: Define the search contract
//TODO: Verify this search contract syntax and semantics.
//TODO: Remove this mock (success, failure) when done from inject array, from function param
//TODO: Remove $q later from inject array, from function param, from search function
//TODO: Remove the random success failure!
//require('./search-mock');
angular.module('mlrg.search')
	.factory('SearchBib', SearchBib);

	SearchBib.$inject = ['$http'/*, 'SearchMockSuccess1','SearchMockSuccess2','SearchMockFailure','$q'*/];

	function SearchBib($http/*, SearchMockSuccess1, SearchMockSuccess2, SearchMockFailure, $q*/){
		

		var getActiveFilters = function(searchParams) {
			var activeFilters = [];
			if(searchParams.author !== null) {
				activeFilters.push('author');
			}
			if(searchParams.year !== null) {
				activeFilters.push('year');
			}
			if(searchParams.selectedType.id !== 0) {
				activeFilters.push('type');
			}
			if(searchParams.journal !== null) {
				activeFilters.push('journal');
			}
			if(searchParams.keywords !== null) {
				activeFilters.push('keywords');
			}
			return activeFilters;
		};


		var search = function(searchParams){
			
			var activeFilters = getActiveFilters(searchParams);
			return $http.post('/api/search/',{
				"metadata" : {
					"page" : searchParams.page,
					"activeFilters": activeFilters
				},
				"payload" : {
					'searchQuery': searchParams.searchText,
					'author': searchParams.author,
					'year': searchParams.year,
					'journal': searchParams.journal,
					'type':searchParams.selectedType.name 
					}
				});
			

			//TODO: The following commented out code essentially function as stubs. Remove it later.
			//var def = $q.defer();
			// var randomBoolean = Math.random() >= 0.5;
			//return randomBoolean ? $q.resolve(SearchMockSuccess1) : $q.reject(SearchMockFailure);
		
			//return searchParams.page == 1 ? $q.resolve(SearchMockSuccess1) : $q.resolve(SearchMockSuccess2)
		
			//return $q.reject(SearchMockFailure);
		};


		var searchObj = {
			search: search
		};

		return searchObj;
	}