'use strict';

//TODO: Define the search contract
//TODO: Verify this search contract syntax and semantics.
//TODO: Remove this mock (success, failure) when done from inject array, from function param
//TODO: Remove $q later from inject array, from function param, from search function
//TODO: Remove the random success failure!
//require('./search-mock');
angular.module('mlrg.search')
    .factory('SearchBib', SearchBib);

SearchBib.$inject = ['$http' /*,'$q', 'SearchMockSuccess1'*/ ];

function SearchBib($http /*, $q, SearchMockSuccess1*/ ) {


    var getActiveFilters = function(searchParams) {
        var activeFilters = [];
        if (searchParams.author !== '') {
            activeFilters.push('author');
        }
        if (searchParams.year !== '') {
            activeFilters.push('year');
        }
        if (searchParams.selectedType.id !== '0') {
            activeFilters.push('type');
        }
        if (searchParams.journal !== '') {
            activeFilters.push('journal');
        }
        if (searchParams.keywords !== '') {
            activeFilters.push('keywords');
        }
        if (searchParams.searchText !== '') {
            activeFilters.push('searchQuery');
        }
        return activeFilters;
    };


    var search = function(searchParams) {

        var activeFilters = getActiveFilters(searchParams);
        return $http.post('/api/search/', {
            'metadata': {
                'page': searchParams.page,
                'activeFilters': activeFilters
            },
            'payload': {
                'searchQuery': searchParams.searchText,
                'author': searchParams.author,
                'year': searchParams.year,
                'journal': searchParams.journal,
                'type': searchParams.selectedType.name
            }
        });


        // return $q.when(SearchMockSuccess1);
    };


    var searchObj = {
        search: search
    };

    return searchObj;
}
