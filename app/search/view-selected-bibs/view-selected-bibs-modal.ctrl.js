'use strict';

angular.module('mlrg.search')
    .controller('ViewSelectedBibsModalInstanceController', ViewSelectedBibsModalInstanceController);

ViewSelectedBibsModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'selectedBibs', 'SweetAlert', '$q'];

function ViewSelectedBibsModalInstanceController($scope, $uibModalInstance, selectedBibs, SweetAlert, $q) {
    $scope.selectedBibs = selectedBibs;
    $scope.pagination = {
        currentPage: 1,
        totalPages: Math.ceil($scope.selectedBibs.length / 10),
        totalItems: $scope.selectedBibs.length,
        itemsPerPage: 5
    };

    $scope.ok = function() {
        $uibModalInstance.dismiss();
    };

    $scope.unselectAll = function() {
        var deferred = $q.defer();


        SweetAlert.swal({
            title: 'Are you sure?',
            text: 'All your bibs will be unselected',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'I am sure',
            closeOnConfirm: false
        },
        function() {
            SweetAlert.swal('Your bibs have been unselected');
            deferred.resolve();
        });

        deferred.promise.then(function() {
            $scope.selectedBibs = [];
            $uibModalInstance.close($scope.selectedBibs);
        });

    };
}
