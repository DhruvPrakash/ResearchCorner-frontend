'use strict';

require('../management/user');


angular.module('mlrg.userworkspace')
    .controller('UserWorkspaceController', UserWorkspaceController);

UserWorkspaceController.$inject = ['$scope','MyBibLists', 'BibList','$uibModal', 'User'];


function UserWorkspaceController($scope, MyBibLists, BibList, $uibModal, User) {

    $scope.mainTab = {
        selectedTab: 'my-lists',
        currentTab : 'my-lists'
    };

    $scope.view = {
    	type: 'biblists',
    	message: null
    };

    $scope.displayedBibs = [];

    $scope.lists = {
    	displayedLists: MyBibLists.data.data,
    	fetching: false
    };

    $scope.changeMainTab = function(selectedTab) {
        var pageNo = 0;
        $scope.lists.fetching = false;
        $scope.mainTab.selectedTab = selectedTab;
        $scope.view.type = 'biblists';
        $scope.displayedBibs = [];
        $scope.lists.displayedLists = [];
        if (selectedTab === 'shared-with-me') {
        	$scope.mainTab.currentTab = 'shared-with-me';
        	$scope.lists.fetching = true;
        	BibList.getSharedWithMe(pageNo).then(function(response){
        		if($scope.mainTab.currentTab === 'shared-with-me') {
        			$scope.lists.displayedLists = response.data.data;
        			$scope.lists.fetching = false;
        		}        		
        	});
        } else if(selectedTab === 'my-lists') {
        	$scope.mainTab.currentTab = 'my-lists'
        	$scope.lists.displayedLists = MyBibLists.data.data;
        } else if(selectedTab === 'shared-by-me') {
        	$scope.mainTab.currentTab = 'shared-by-me';
        	$scope.lists.fetching = true;
        	BibList.getSharedByMe(pageNo).then(function(response){
        		if($scope.mainTab.currentTab === 'shared-by-me') {
        			
        			$scope.lists.displayedLists = response.data.data.reduce(function(res,curr,next){
        				var tempObj = {
        					'usernames': [curr.username],
        					'bibListName': curr.bibListName,
                            'bibListId' : curr.bibListId
        				};
        				if(res.length === 0) {
        					res.push(tempObj);
        				} else {
        					//check if the bibListName is already in res
        					var bibListArr = res.filter(function(bibList){
        						return bibList.bibListName === curr.bibListName;
        					});

        					if(bibListArr[0] !== undefined) {
        						bibListArr[0].usernames.push(curr.username);
        					} else {
        						res.push(tempObj);
        					}
        				}
        				return res;
        			},[]);
        			$scope.lists.fetching = false;
        		}        		
        	});
        }
    };

    $scope.sharedWith = function(list) {
    	$uibModal.open({
    	    templateUrl: '/app/user-workspace/view-shared-with/view-shared-with-modal.partial.html',
    	    controller: 'ViewSharedWithInstanceController',
    	    size: 'md',
    	    resolve: {
    	        sharedWith: function() {
    	            return list.usernames;
    	        }
    	    }
    	});
    };

    $scope.shareList = function(list){
    	$uibModal.open({
    		templateUrl: '/app/user-workspace/share/share-list-modal.partial.html',
    		controller: 'ShareListInstanceController',
    		size: 'md',
    		resolve: {
    			SharedList: function(){
    				return list;
    			},
    			Users: function(){
    				return User.fetchUsers($scope.userInfo.userName);
    			}
    		}
    	})
    };

    $scope.showBibItems = function(bibList){
    	var bibListId;
        if($scope.mainTab.selectedTab === 'my-lists') {
            bibListId = bibList.id;
        } else if ($scope.mainTab.selectedTab === 'shared-with-me' || $scope.mainTab.selectedTab === 'shared-by-me') {
            bibListId = bibList.bibListId;
        }
        $scope.view.type = 'bibitems';
    	$scope.view.message = 'Please wait! We are fetching the bibitems for the ' + bibList.bibListName + ' list';
    	BibList.getBibItemsInList(bibListId).then(function(response){
    		$scope.view.message = 'Showing bibitems for the ' + bibList.bibListName + ' list';
    		$scope.displayedBibs = response.data.data;
    	});

    };

    $scope.showBibLists = function() {
    	$scope.displayedBibs = [];
    	$scope.view.type = 'biblists';
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

    $scope.viewFullDetails = function(bibItem) {
        $uibModal.open({
            templateUrl: '/app/search/view-full-details/view-full-details-modal.partial.html',
            controller: 'ViewFullDetailsModalInstanceController',
            size: 'md',
            resolve: {
                bibDetails: function() {
                    return {
                        author: bibItem.author,
                        abstract: bibItem.abstract,
                        __markedentry: (bibItem.markedEntry !== undefined) ? bibItem.markedEntry : bibItem.__markedentry,
                        address: bibItem.address,
                        booktitle: (bibItem.bookTitle !== undefined) ? bibItem.bookTitle : bibItem.booktitle,
                        chapter: bibItem.chapter,
                        comment: bibItem.comment,
                        crossref: (bibItem.crossRef !== undefined) ? bibItem.crossRef : bibItem.crossref,
                        doi: bibItem.doi,
                        edition: bibItem.edition,
                        editor: bibItem.editor,
                        howpublished: (bibItem.howPublished !== undefined) ? bibItem.howPublished : bibItem.howpublished,
                        institution: bibItem.institution,
                        journal: bibItem.journal,
                        keywords: bibItem.keywords,
                        month: bibItem.month,
                        note: bibItem.note,
                        number: bibItem.number,
                        organization: bibItem.organization,
                        owner: bibItem.owner,
                        pages: bibItem.pages,
                        publisher: bibItem.publisher,
                        school: bibItem.school,
                        series: bibItem.series,
                        timestamp: (bibItem.timeStamp !== undefined) ? bibItem.timeStamp : bibItem.timestamp,
                        title: bibItem.title,
                        type: bibItem.type,
                        url: bibItem.url,
                        volume: bibItem.volume,
                        year: bibItem.year,
                    };
                }
            }
        });
    };

}
