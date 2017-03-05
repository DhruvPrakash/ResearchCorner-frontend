'use strict';

require('./search');
require('../bib-create/bib-add/bib');
angular.module('mlrg.search')
    .controller('SearchController', SearchController);

SearchController.$inject = ['$scope', 'SearchBib', '$uibModal', 'SweetAlert', '$state', 'Bib'];

function SearchController($scope, SearchBib, $uibModal, SweetAlert, $state, Bib) {

    var MAX_SELECTABLE = 250;

    $scope.searchParams = {
        searchText: '',
        limit: 10,
        page: 1,
        author: '',
        keywords: '',
        year: '',
        type: '',
        selectedType: { id: '0', name: 'Any Type' },
        journal: ''
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

    $scope.selectedBibs = [];

    var markupSelectedBibs = function() {
        return $scope.searchedBibs.map(function(searchedBib) {
            searchedBib.isSelected = $scope.selectedBibs.some(function(selectedBib) {
                return searchedBib.id === selectedBib.id;
            });
            return searchedBib;
        });
    };

    var setPagination = function(currentPage, totalPages, totalItems) {
        $scope.pagination.currentPage = currentPage;
        $scope.pagination.totalPages = totalPages;
        $scope.pagination.totalItems = totalItems;
    };

    $scope.addBibToSelected = function(bib) {

        var bibAlreadyPresent = $scope.selectedBibs.some(function(presentBib) {
            return presentBib.id === bib.id;
        });
        if (bibAlreadyPresent) {
            bib.isSelected = false;
            $scope.selectedBibs = $scope.selectedBibs.filter(function(presentBib) {
                return presentBib.id !== bib.id;
            });
        } else {
            if ($scope.selectedBibs.length + 1 > MAX_SELECTABLE) {
                bib.isSelected = false;
                SweetAlert.swal('', 'You cannot select more than ' + MAX_SELECTABLE + ' bibs! Please add them to a bib list first!', 'warning');
            } else {
                bib.isSelected = true;
                $scope.selectedBibs = $scope.selectedBibs.concat([bib]);
            }
        }
    };


    $scope.search = function(pageNum) {
        var totalPages;
        $scope.searchParams.page = pageNum;

        if (!!$scope.searchParams.searchText && $scope.searchParams.searchText.length >= 4) {
            $scope.searchedBibs = [];
            SearchBib.search($scope.searchParams).then(function(result) {
                $scope.error.errorPresent = false;
                $scope.searchedBibs = result.data.payload;

                if ($scope.searchedBibs.length > 0) {
                    $scope.searchedBibs = markupSelectedBibs();
                    totalPages = Math.ceil(+result.data.metadata.total_records / $scope.pagination.itemsPerPage);
                    setPagination(result.data.metadata.current_page, totalPages, result.data.metadata.total_records);
                } else {
                    $scope.error.errorPresent = true;
                    $scope.error.errorMessage = 'Sorry, no bibs found matching that search query';
                    setPagination(null, null, null);
                }


            });
        } else {
            $scope.searchedBibs = [];
            $scope.error.errorPresent = false;
            setPagination(null, null, null);
        }
    };

    $scope.viewAbstract = function(bibItem) {


        $uibModal.open({
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

    $scope.viewSelectedBibs = function() {
        if ($scope.selectedBibs.length === 0) {
            SweetAlert.swal('', 'No bibs have been selected!', 'warning');
        } else {
            $uibModal.open({
                templateUrl: '/app/search/view-selected-bibs/view-selected-modal.partial.html',
                controller: 'ViewSelectedBibsModalInstanceController',
                size: 'md',
                resolve: {
                    selectedBibs: function() {
                        return $scope.selectedBibs;
                    }
                }
            }).result.then(function(selectedBibs) {
                $scope.selectedBibs = selectedBibs;
                $scope.searchedBibs = markupSelectedBibs();
            });
        }
    };

    $scope.addFilter = function() {
        $uibModal.open({
            templateUrl: '/app/search/add-filters/search-filter-modal.partial.html',
            controller: 'SearchFilterModalInstanceController',
            size: 'md',
            resolve: {
                activeFilters: function() {
                    return $scope.searchParams;
                }
            }
        }).result.then(function(activeFilters) {
            $scope.searchParams = activeFilters;
            $scope.search(1);
        });
    };

    $scope.editBib = function(bib) {
        Bib.setBibToBeEdited(bib);
        $state.go('editModal');
    };

}
