'use strict';

angular.module('mlrg.management')
    .factory('User', User);

User.$inject = ['$http', '$q', '$timeout'];

function User($http, $q, $timeout) {

	var fetchUsers = function(myUsername){
		// var mock = [
		// 			{
		// 			      "username":"turing",
		// 			      "is_superuser":false,
		// 			      "group":"Researcher",
		// 			      "id":4,
		// 			      "date_joined":"2017-03-10T06:50:26.266Z"
		// 			   },
		// 			   {
		// 			      "username":"student",
		// 			      "is_superuser":false,
		// 			      "group":"Student",
		// 			      "id":6,
		// 			      "date_joined":"2017-03-10T06:51:59.719Z"
		// 			   },
		// 			   {
		// 			      "username":"researcher",
		// 			      "is_superuser":false,
		// 			      "group":"Researcher",
		// 			      "id":5,
		// 			      "date_joined":"2017-03-10T06:51:47.566Z"
		// 			   },
		// 			   {
		// 			      "username":"student1",
		// 			      "is_superuser":false,
		// 			      "group":"Student",
		// 			      "id":61,
		// 			      "date_joined":"2017-03-10T06:51:59.719Z"
		// 			   },
		// 			   {
		// 			      "username":"student2",
		// 			      "is_superuser":false,
		// 			      "group":"Student",
		// 			      "id":62,
		// 			      "date_joined":"2017-03-10T06:51:59.719Z"
		// 			   },
		// 			   {
		// 			      "username":"student3",
		// 			      "is_superuser":false,
		// 			      "group":"Student",
		// 			      "id":63,
		// 			      "date_joined":"2017-03-10T06:51:59.719Z"
		// 			   },
		// 			   {
		// 			      "username":"student4",
		// 			      "is_superuser":false,
		// 			      "group":"Student",
		// 			      "id":64,
		// 			      "date_joined":"2017-03-10T06:51:59.719Z"
		// 			   }
		// 			];

		// return $timeout(function(){
		// 	return  mock.reduce(function(res,curr,next){
		// 		if(curr.username !== myUsername) {
		// 			res.push({
		// 				'username': curr.username,
		// 				'id': curr.id
		// 			});
		// 		}
		// 		return res;
		// 	},[]);
				
			
		// });

		return $http.get('/management/listusers').then(function(result){
			return result.data.reduce(function(res,curr,next) {
				if(curr.username !== myUsername) {
					res.push({
						'username': curr.username,
						'id': curr.id
					});
				}
				return res;
			},[]);

		});
	};
	

    var userObj = {
        fetchUsers: fetchUsers,
    };

    return userObj;
}
