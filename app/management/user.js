'use strict';

angular.module('mlrg.management')
    .factory('User', User);

User.$inject = ['$http', '$q', '$timeout'];

function User($http, $q, $timeout) {

	var fetchUsers = function(){
		// return $timeout(function(){
		// 	return {
		// 		'data': 
		// 			[
		// 			   {
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
		// 			   }
		// 			]
				
		// 	}
		// });

		return $http.get('/management/listusers').then(function(result){
			return result.data.map(function(user){
				return {
					'username': user.username,
					'id': user.id
				}
			})
		});
	};
	

    var userObj = {
        fetchUsers: fetchUsers,
    };

    return userObj;
}
