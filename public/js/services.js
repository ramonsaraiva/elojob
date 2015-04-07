/*
 * services.js
 *
 */

var services = angular.module('services', []);

services.factory('db', ['$http', function($http, module) {

	function db(module)
	{
		this.m = module;
		this.url = '/db/' + this.m + '/';
	}

	db.prototype.create = function(record) {
		return $http.post(this.url, { data: record });
	};

	db.prototype.read = function(id) {
		return $http.get(this.url + id);
	};

	db.prototype.update = function(id, record) {
		return $http.patch(this.url + id, { data: record });
	};

	db.prototype.delete = function(id) {
		return $http.delete(this.url + id);
	};

	db.prototype.list = function() {
		return $http.get(this.url);
	};

	db.prototype.list_params = function(params) {
		return $http.get(this.url, { params: { filter_params: params } });
	};

	return db;
}]);

//services = angular.module('services', ['ngResource']);
//services.factory('db2', ['$resource', function($resource, module) {
//	return $resource('/db/module/:id');
//}]);
//

services.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (email, password, callback) {

            $http.post('/auth/', { email: email, password: password })
                .success(function (response) {
					var res = { success: true, record: response };
                    callback(res);
				})
				.error(function(response) {
					var res = { success: false };
					callback(res);
				});
        };
 
        service.SetCredentials = function (id, email, password) {
            var authdata = email + ':' + password;
 
            $rootScope.globals = {
                currentUser: {
					id: id,
                    email: email,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
 
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
 
        return service;
}])
