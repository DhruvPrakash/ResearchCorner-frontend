'use strict';

angular.module('mlrg.search')
    .controller('ViewPresentInInstanceController', ViewPresentInInstanceController);

ViewPresentInInstanceController.$inject = ['$scope', 'bibLists', '$uibModalInstance'];

function ViewPresentInInstanceController($scope, bibLists, $uibModalInstance) {
    $scope.bibLists = bibLists;

    $scope.ok = function() {
        $uibModalInstance.close();
    };
}
