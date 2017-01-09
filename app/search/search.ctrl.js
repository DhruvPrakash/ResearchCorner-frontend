'use strict';

require('./search');
angular.module('mlrg.search')
    .controller('SearchController', SearchController);

SearchController.$inject = ['$scope', 'SearchBib', '$uibModal'];

function SearchController($scope, SearchBib, $uibModal) {

    $scope.searchParams = {
        searchText: null,
        limit: 10,
        page: 1
    };

    $scope.pagination = {
        currentPage: null,
        totalPages: null,
        totalItems: null,
        itemsPerPage: 10
    };

    $scope.error = {
        errorPresent: false,
        errorMessage: null
    };

    $scope.searchedBibs = [];


    $scope.search = function(pageNum) {

        $scope.searchParams.page = pageNum;

        if (!!$scope.searchParams.searchText && $scope.searchParams.searchText.length >= 5) {
            SearchBib.search($scope.searchParams).then(function(result) {
                $scope.error.errorPresent = false;
                $scope.searchedBibs = result.data.payload;
                $scope.pagination.currentPage = result.data.metadata.current_page;
                $scope.pagination.totalPages = Math.ciel(+result.data.metadata.total_records/$scope.pagination.itemsPerPage);
                $scope.pagination.totalItems = result.data.metadata.total_records;
            }, function(result) {
                $scope.searchedBibs = [];
                $scope.error.errorPresent = true;
                $scope.error.errorMessage = result.data.error.message;
            });
        } else {
            $scope.searchedBibs = [];
            $scope.error.errorPresent = false;
        }
    };

    $scope.viewAbstract = function(bibItem) {


        var modalInstance = $uibModal.open({
            templateUrl: '/app/search/view-abstract/view-abstract-modal.partial.html',
            controller: 'ViewAbstractModalInstanceController',
            size: 'md',
            resolve: {
                bibDetails: function() {
                    return {
                    	abstract: bibItem.abstract,
                    	title: bibItem.title
                    };
                }
            }
        });
    };

    // $scope.viewSelectedBibs = function(){

    // 	var modalInstance = $uibModal.open({
    //         templateUrl: '/app/search/view-selected-bibs/view-abstract-modal.partial.html',
    //         controller: 'ViewAbstractModalInstanceController',
    //         size: 'md',
    //         resolve: {
    //             bibDetails: function() {
    //                 return {
    //                 	abstract: bibItem.abstract,
    //                 	title: bibItem.title
    //                 };
    //             }
    //         }
    //     });
    // };

}
