angular.module('app.routes', [ 'ngRoute' ]).config(function($routeProvider, $httpProvider) {

	$routeProvider
	
	.when('/', {
		templateUrl : 'ng/partials/home.html',
		controller : 'homeController'
	})
	.when('/main', {
		templateUrl : 'ng/partials/main.html',
		controller : 'mainController'
	})
	.when('/login', {
		templateUrl : 'ng/partials/auth/login.html',
		controller : 'loginController'
	})
	.when('/signup', {
		templateUrl : 'ng/partials/auth/signup.html',
		controller : 'registerController'
	})
	.otherwise('/');

	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

});