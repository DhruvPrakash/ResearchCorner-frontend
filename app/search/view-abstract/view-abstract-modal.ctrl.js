'use strict';

angular.module('mlrg.search')
    .controller('ViewAbstractModalInstanceController', ViewAbstractModalInstanceController);

ViewAbstractModalInstanceController.$inject = ['$scope', 'bibDetails', '$uibModalInstance'];

function ViewAbstractModalInstanceController($scope, bibDetails, $uibModalInstance) {
    $scope.bibDetails = bibDetails;

    $scope.ok = function() {
        $uibModalInstance.close();
    };
}
