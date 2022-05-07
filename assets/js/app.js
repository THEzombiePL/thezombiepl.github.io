
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl : 'pages/home.html',
		controller	: 'Home'
	})

	.when('/kontakt', {
		templateUrl : 'pages/contact.html',
		controller	: 'Contact'
	})

	.when('/projekty', {
		templateUrl : 'pages/projects.html',
		controller	: 'Projects'
	})

	.otherwise({redirectTo: '/'});
});



app.controller('Home', ['$scope', '$location', function($scope, $location) {
	$scope.message = 'Hello from HomeController';
	ez($scope, $location)
}]);

app.controller('Contact', ['$scope', '$location', function($scope, $location) {
	$scope.message = 'Hello from BlogController';
	ez($scope, $location)
}]);

app.controller('Projects', ['$scope', '$location', function($scope, $location) {
	$scope.message = 'Hello from AboutController';
	ez($scope, $location)
}]);


let beforeload = (new Date()).getTime(),
		afterload,
		seconds;
function ez(scope, location) {
	scope.isActive = function (viewLocation) {
		console.log(location)
		console.log(location.path() == viewLocation)
		return viewLocation === location.path();
	}
	scope.$on('$routeChangeStart', () => {
		beforeload = (new Date()).getTime();
		$('#preloader').fadeIn(50);
	});
	scope.$on('$routeChangeSuccess', () => {
		afterload = (new Date()).getTime();
		seconds = (afterload - beforeload) / 1000;
		$("#footer_load_time").text(seconds + ' s');

		$('#preloader').fadeOut(1250);
	});
}

app.controller('Navigation', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
}]);