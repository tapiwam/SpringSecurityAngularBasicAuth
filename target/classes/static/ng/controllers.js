angular.module('controllers', [ 'services' ])

.controller('navigation', function($scope, $route, Auth) {
	
	console.log("-->In navigation controller");
	$scope.auth = Auth;

	$scope.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

	// $scope.auth.authenticate();
})

.controller('loginController', function($scope, $rootScope, $location, Auth) {
	console.log("-->In auth controller");
	
	$scope.data = {};
	Auth.ClearCredentials();
	
	$scope.login = function () {
        $scope.dataLoading = true;
        Auth.Login($scope.data.username, $scope.data.password, function(response) {
        	console.log("Data in callback --> " + JSON.stringify(response));
            if(response) {
            	console.log("setting credentials");
            	Auth.SetCredentials($scope.data.username, $scope.data.password);
                $location.path('#/main');
            } else {
                $scope.data.error = true;
                $scope.data.password = "";
                $scope.dataLoading = false;
            }
        });
	};
	
	
})

.controller('registerController', function($scope, $rootScope, $location, Auth){
	
	$scope.data = {};

	$scope.register = function () {
		if($scope.data.password == $scope.data.password_check){
			Auth.Register($scope.data.username, $scope.data.email, $scope.data.password, function(response){
				if(response.success) {
	            	Auth.SetCredentials($scope.data.username, $scope.data.password);
	                $location.path('#/main');
	            } else {
	                $scope.data.error = false;
	                $scope.data.password = "";
	                $scope.data.password_check = "";
	                $scope.dataLoading = false;
	            }
			});
		} else {
			alert("Passwords do not match! Please try again.");
			$scope.data.password = "";
            $scope.data.password_check = "";
		}
	}
})

.controller('homeController', function($scope, $http) {
	console.log("-->In home controller");
	
	$http.get('/resource/').success(function(data) {
		$scope.greeting = data;
	});
})

.controller('mainController', function($scope, $http, Auth) {
	console.log("-->In main");
	
	$scope.auth = Auth;

	$http.get('/resource/').success(function(data) {
		$scope.greeting = data;
	});
})
;