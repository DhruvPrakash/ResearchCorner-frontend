'use strict';

angular.module('mlrg.userworkspace')
    .controller('ViewSharedWithInstanceController', ViewSharedWithInstanceController);

ViewSharedWithInstanceController.$inject = ['$scope', 'sharedWith', '$uibModalInstance'];

function ViewSharedWithInstanceController($scope, sharedWith, $uibModalInstance) {
    $scope.usernames = sharedWith;

    $scope.ok = function() {
        $uibModalInstance.close();
    };
}
