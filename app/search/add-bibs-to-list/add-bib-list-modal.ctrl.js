'use strict';

angular.module('mlrg.search')
    .controller('AddBibsToListModalInstanceController', AddBibsToListModalInstanceController);

AddBibsToListModalInstanceController.$inject = ['$scope', 'selectedBibIds', '$uibModalInstance'];

function AddBibsToListModalInstanceController($scope, selectedBibIds, $uibModalInstance) {
    $scope.selectedBibIds = selectedBibIds;
    
    console.log($scope.selectedBibIds);

    //create a bib list or update a bib list can be done here

    $scope.ok = function() {
        $uibModalInstance.close();
    };
}
