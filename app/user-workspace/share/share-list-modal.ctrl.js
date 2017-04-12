'use strict';

angular.module('mlrg.userworkspace')
    .controller('ShareListInstanceController', ShareListInstanceController);

ShareListInstanceController.$inject = ['$scope', 'selectedBibIds', 'bibLists', '$uibModalInstance', 'SweetAlert', 'BibList','sharedList'];

function ShareListInstanceController($scope, selectedBibIds, bibLists, $uibModalInstance, SweetAlert, BibList, sharedList) {
    


    var availableLists = bibLists;
    $scope.newBibListName = '';
    $scope.pageInfo = {
        currentPage: 0,
        itemsPerPage: 5,
    }
    $scope.pageInfo.totalPages = Math.floor(availableLists.length / $scope.pageInfo.itemsPerPage);

    $scope.selectedBibIds = selectedBibIds;
    $scope.availableDisplayedLists = [];
    $scope.selectedLists = [];



    var setAvailableDisplayed = function(){
        $scope.availableDisplayedLists = [];
        for(var i = ($scope.pageInfo.currentPage * $scope.pageInfo.itemsPerPage); i<($scope.pageInfo.currentPage + 1) * $scope.pageInfo.itemsPerPage && i < availableLists.length; i++) {
            $scope.availableDisplayedLists.push(availableLists[i]);
        }
    };

    $scope.togglePage = function(nextOrPrev) {
        $scope.pageInfo.currentPage = (nextOrPrev === 'prev') ? $scope.pageInfo.currentPage - 1 : $scope.pageInfo.currentPage + 1;
        setAvailableDisplayed();
    };

    $scope.search = function(){
        if($scope.searchText !== '') {
            $scope.pageInfo.currentPage = 0;
            availableLists = bibLists.filter(function(list){
                return list.bibListName.toLowerCase().indexOf($scope.searchText.toLowerCase()) !== -1;
            });
            $scope.pageInfo.totalPages = Math.floor(availableLists.length / $scope.pageInfo.itemsPerPage);
            setAvailableDisplayed();
        } else {
            $scope.pageInfo.currentPage = 0;
            availableLists = bibLists;
            $scope.pageInfo.totalPages = Math.floor(availableLists.length / $scope.pageInfo.itemsPerPage);
            setAvailableDisplayed();
        }
    };

    //create a bib list or update a bib list can be done here

    $scope.addToSelected = function(list) {
    	var alreadySelected = false;;
        if($scope.newBibListName !== '') {
            SweetAlert.swal('Sorry, cannot select a bib list and create one at the same time.', '', 'warning');
            return;
        }

        if ($scope.selectedLists.length < 5){
            alreadySelected = $scope.selectedLists.some(function(selectedList){
                return selectedList.bibListName === list.bibListName && selectedList.id === list.id;
            });
            if(!alreadySelected) {
                $scope.selectedLists.push(list);
            }
    	} else {
            SweetAlert.swal('Sorry, only 5 lists can be selected at a time.', '', 'warning');
        }
    };

    $scope.removeFromSelected = function(listId) {
    	$scope.selectedLists = $scope.selectedLists.filter(function(list){
    		return list.id !== listId;
    	});
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };



    $scope.addToLists = function(){
        if($scope.newBibListName !== '') {
            BibList.createList($scope.newBibListName, selectedBibIds).then(function(){
                SweetAlert.swal('The bib list has been created and the selected bibs have been added!','','success');
                $scope.close();
            }, function(){
                SweetAlert.swal('Something went wrong!', '', 'warning');
                $scope.close();
            });            
        } else if($scope.selectedLists.length > 0) {
            BibList.updateList($scope.selectedLists, selectedBibIds).then(function(){
                SweetAlert.swal('The selected bibs have been added to selected lists!','','success');
                $scope.close();
            }, function(){
                SweetAlert.swal('Something went wrong!', '', 'warning');
                $scope.close();
            })
        } else {
            SweetAlert.swal('Please either select lists or create one');
        }
    };

    setAvailableDisplayed();
}
