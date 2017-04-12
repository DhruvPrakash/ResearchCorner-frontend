'use strict';

angular.module('mlrg.userworkspace')
    .controller('ShareListInstanceController', ShareListInstanceController);

ShareListInstanceController.$inject = ['$scope', '$uibModalInstance', 'SweetAlert', 'BibList','SharedList', 'Users'];

function ShareListInstanceController($scope, $uibModalInstance, SweetAlert, BibList, SharedList, Users) {
    

    var availableUsers = Users;
    $scope.pageInfo = {
        currentPage: 0,
        itemsPerPage: 5,
    }
    $scope.pageInfo.totalPages = Math.floor(availableUsers.length / $scope.pageInfo.itemsPerPage);

    $scope.availableDisplayedUsers = [];
    $scope.selectedUsers = [];

    $scope.bibListToBeShared = SharedList;
    
    var setAvailableDisplayed = function(){
        $scope.availableDisplayedUsers = [];
        for(var i = ($scope.pageInfo.currentPage * $scope.pageInfo.itemsPerPage); i<($scope.pageInfo.currentPage + 1) * $scope.pageInfo.itemsPerPage && i < availableUsers.length; i++) {
            $scope.availableDisplayedUsers.push(availableUsers[i]);
        }
    };

    $scope.togglePage = function(nextOrPrev) {
        $scope.pageInfo.currentPage = (nextOrPrev === 'prev') ? $scope.pageInfo.currentPage - 1 : $scope.pageInfo.currentPage + 1;
        setAvailableDisplayed();
    };

    $scope.search = function(){
        if($scope.searchText !== '') {
            $scope.pageInfo.currentPage = 0;
            availableUsers = Users.filter(function(user){
                return user.username.toLowerCase().indexOf($scope.searchText.toLowerCase()) !== -1;
            });
            $scope.pageInfo.totalPages = Math.floor(availableUsers.length / $scope.pageInfo.itemsPerPage);
            setAvailableDisplayed();
        } else {
            $scope.pageInfo.currentPage = 0;
            availableUsers = Users;
            $scope.pageInfo.totalPages = Math.floor(availableUsers.length / $scope.pageInfo.itemsPerPage);
            setAvailableDisplayed();
        }
    };


    $scope.addToSelected = function(user) {
    	var alreadySelected = false;;
        
        if ($scope.selectedUsers.length < 5){
            alreadySelected = $scope.selectedUsers.some(function(selectedUser){
                return selectedUser.username === user.username && selectedUser.id === user.id;
            });
            if(!alreadySelected) {
                $scope.selectedUsers.push(user);
            }
    	} else {
            SweetAlert.swal('Sorry, only 5 users can be selected at a time.', '', 'warning');
        }
    };

    $scope.removeFromSelected = function(userId) {
    	$scope.selectedUsers = $scope.selectedUsers.filter(function(user){
    		return user.id !== userId;
    	});
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };



    $scope.share = function(){
        var selectedUserIds = [];
    	if($scope.selectedUsers.length === 0) {
    		SweetAlert.swal('Please select some users to share the list with!');
    	} else {
    		selectedUserIds = $scope.selectedUsers.map(function(user){
    			return user.id;
    		});
    		BibList.shareList($scope.bibListToBeShared.id, selectedUserIds).then(function(){
    			SweetAlert.swal($scope.bibListToBeShared.bibListName + ' is shared with the selected people');
    			$scope.close();
    		}, function(){
    			SweetAlert.swal('Something went wrong!','','warning');
    			$scope.close();
    		});
    	}
    };

    setAvailableDisplayed();
}
