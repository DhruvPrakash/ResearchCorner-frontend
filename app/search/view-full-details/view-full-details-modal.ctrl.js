'use strict';

angular.module('mlrg.search')
    .controller('ViewFullDetailsModalInstanceController', ViewFullDetailsModalInstanceController);

ViewFullDetailsModalInstanceController.$inject = ['$scope', 'bibDetails', '$uibModalInstance'];

function ViewFullDetailsModalInstanceController($scope, bibDetails, $uibModalInstance) {
    $scope.bibDetails = bibDetails;
    

    $scope.ok = function() {
        $uibModalInstance.close();
    };
}
