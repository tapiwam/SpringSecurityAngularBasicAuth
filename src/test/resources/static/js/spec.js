describe("App", function() {

	beforeEach(module('hello'));
	var $httpBackend, $controller, $http;
	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$controller = $injector.get('$controller');
		$http = $injector.get('$http');
	}));
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe("Default headers", function() {

		it("include X-Requested-With", function() {
			var $scope = {};
			$httpBackend.expectGET('', function(headers) {
				expect(headers['X-Requested-With']).toEqual('XMLHttpRequest');
				return true;
			}).respond(200);
			$http.get('')
			$httpBackend.flush();
		});

	});

	describe("Home Controller", function() {

		it("says Hello Test when controller loads", function() {
			var $scope = {};
			$httpBackend.expectGET('/resource/').respond(200, {
				id : 4321,
				content : 'Hello Test'
			});
			var controller = $controller('home', {
				$scope : $scope
			});
			$httpBackend.flush();
			expect($scope.greeting.content).toEqual('Hello Test');
		});

	});

	describe("Navigation Controller", function() {

		var controller;
		var $scope = {};
		var $rootScope = {};

		beforeEach(inject(function($injector) {
			$httpBackend.expectGET('user').respond(401);
			$httpBackend.expectGET('home.html').respond(200);
			controller = $controller('navigation', {
				$scope : $scope,
				$rootScope : $rootScope
			});
			$httpBackend.flush();
		}));

		it("tries to authenticate when controller loads", function() {
			expect($rootScope.authenticated).toEqual(false);

		});

		describe("Login", function() {

			it("authenticates successfully with correct credentials", function() {
				$httpBackend.expectGET('user', function(headers) {
					expect(headers.authorization).toBeDefined();
					return true;
				}).respond(200, {
					name : 'user'
				});
				$scope.credentials = {
					username : 'user',
					password : 'pwd'
				};
				$scope.login();
				$httpBackend.flush();
				expect($rootScope.authenticated).toEqual(true);
			});

			it("does not authenticate successfully if credentials are bad", function() {
				$httpBackend.expectGET('user', function(headers) {
					expect(headers.authorization).toBeDefined();
					return true;
				}).respond(401);
				$httpBackend.expectGET('login.html').respond(200);
				$scope.credentials = {
					username : 'user',
					password : 'foo'
				};
				$scope.login();
				$httpBackend.flush();
				expect($rootScope.authenticated).toEqual(false);
			});

		});

		describe("Logout", function() {

			it("successful logout", function() {
				$httpBackend.expectPOST('logout').respond(200);
				$scope.logout();
				$httpBackend.flush();
				expect($rootScope.authenticated).toEqual(false);
			});

			it("unsuccessful logout", function() {
				$httpBackend.expectPOST('logout').respond(400);
				$scope.logout();
				$httpBackend.flush();
				expect($rootScope.authenticated).toEqual(false);
			});

		});

	});

})
