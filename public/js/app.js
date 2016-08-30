
var app = angular.module("Passport",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
		.when('/home',{
				templateUrl: 'views/home/home.html'
		})
		.when('/login',{
				templateUrl: 'views/login/login.html',
				controller: 'LoginCtrl'
		})
		.when('/profile',{
				templateUrl: 'views/profile/profile.html'
		})
		.when('/register',{
				templateUrl: 'views/registration/registration.html'
		})
		.otherwise({
				redirectTo: '/home',
		})



})