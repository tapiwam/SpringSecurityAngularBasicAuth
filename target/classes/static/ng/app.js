angular.module('app', [ 'app.routes', 'controllers', 'services'])

.run(['$rootScope', '$location', '$cookieStore', '$http', 'Auth',
      function ($rootScope, $location, $cookieStore, $http, Auth) {
          // keep user logged in after page refresh
          $rootScope.globals = $cookieStore.get('globals') || {};
          
          console.log("Variables from cookieStore ---> " + JSON.stringify($rootScope.globals));
          
          if ($rootScope.globals.currentUser) {
              $http.defaults.headers.common['authorization'] = $rootScope.globals.currentUser.authdata; // jshint ignore:line
              
              console.log("SET HEADERS --> " + JSON.stringify( $http.defaults.headers.common ));
              Auth.authenticate();
          }
          
          $rootScope.$on('$locationChangeStart', function (event, next, current) {
              // redirect to login page if not logged in
        	  console.log("PATH: >>" + $location.path() + "<<" + "  --> " + ( $location.path() == '/login' || $location.path() == '/signup' || $location.path() == '' || $location.path() == '/'));
              if ( !( $location.path() == '/login' || $location.path() == '/signup' || $location.path() == '' || $location.path() == '/')  && 
            		  !$rootScope.globals.currentUser) {
                  $location.path('/login');
              }
          });
      }]);