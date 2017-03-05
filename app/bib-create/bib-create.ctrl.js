'use strict';


angular.module('mlrg.bibcreate')
    .controller('BibCreateController', BibCreateController);

BibCreateController.$inject = ['$scope'];


function BibCreateController($scope) {


    $scope.mainTab = {
        selectedTab: 'add'
    };


    $scope.changeMainTab = function(selectedTab) {
        $scope.mainTab.selectedTab = selectedTab;
    };


}
