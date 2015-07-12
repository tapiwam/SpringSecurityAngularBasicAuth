angular.module('services', ['ngRoute', 'ngCookies'])

.factory('Auth', function($rootScope, $cookieStore, $http, $location, $route){
	
	var service = {};
	 
    service.Login = function (username, password, callback) {
    	
    	console.log("Uname: " + JSON.stringify(username) );
    	console.log("Password: " + JSON.stringify(password) );
    	
    	var headers = ( username ) ? {
			authorization : "Basic "
					+ btoa(username + ":"
							+ password)
		} : {};
		
		console.log("Headers: " + JSON.stringify(headers) );

		$http.get('user', {
			headers : headers
		}).success(function(data) {
			if (data.name) {
				$rootScope.user = data;
				$cookieStore.put('user', $rootScope.user);
				
				console.log("Auth name: " + data.name );
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			
			console.log("Login passed --> calling callback function");
			callback(data);
		}).error(function() {
			$rootScope.authenticated = false;
			callback(false);
		});
			
    };
    
    service.authenticate = function(callback){
    	$http.get('user')
    	.success(function(data) {
			if (data.name) {
				$rootScope.user = data;
				$cookieStore.put('user', $rootScope.user);
				
				console.log("Auth name: " + data.name );
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			
			console.log("Login passed --> calling callback function");
			callback && callback(data);
		}).error(function() {
			$rootScope.authenticated = false;
			callback(false);
		});
    }
	
    service.SetCredentials = function (username, password) {
        var authdata =( username ) ? "Basic " + btoa(username + ":" + password) : {};

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };
        
        console.log("Set global scope and cookies: ==> " + $rootScope.globals);

        $http.defaults.headers.common['authorization'] = 'Basic ' + btoa(username + ":" + password) ; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    };

    service.ClearCredentials = function () {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.authorization = 'Basic ';
        $rootScope.authenticated = false;
    };
	
    service.Register = function(username, email, password, callback) {
    	var data = {
    			username:username, password:password, email:email
    			};
    	
    	console.log("User data: " + data);
		$http.post('signup', data)
			.success(function(data) {
			if (data.name) {
				auth.credentials = data;
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback($rootScope.authenticated);
		}).error(function() {
			$rootScope.authenticated = false;
			callback && callback(false);
		});

	};
	
	service.logout = function() {
		service.ClearCredentials();
		$http.post('logout', {}).success(function() {
			$location.path("/");
		}).error(function(data) {
			console.log("Logout failed")
			$location.path("/");
		});
	};
	
	return service;
})