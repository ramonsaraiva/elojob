/*
 * app.js
 *
 */

var app = angular.module('app', [
	'ngRoute',
	'ngSanitize',
	'ngCookies',

	'ui.bootstrap',
	'ui.select',
	'ngGrid',

	'controllers',
	'services'
]);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.tpl.html'
		})
		.when('/entrar', {
			templateUrl: 'partials/login.tpl.html',
			controller: 'loginController'
		})
		.when('/cadastro', {
			templateUrl: 'partials/cadastro.tpl.html',
			controller: 'cadastroController'
		})
		.when('/encomenda', {
			templateUrl: 'partials/encomenda.tpl.html',
			controller: 'encomendaController'
		})
		.otherwise({
			redirectTo: '/'
		});
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
		function($rootScope, $location, $cookieStore, $http) {
			// keep user logged in after page refresh
			$rootScope.globals = $cookieStore.get('globals') || {};
			if ($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
			}

			$rootScope.$on('$locationChangeStart', function (event, next, current) {
				// redirect to login page if not logged in
				if ($location.path() !== '/entrar' && $location.path() !== '/cadastro' && !$rootScope.globals.currentUser) {
					$location.path('/entrar');
				}
			});
}]);
