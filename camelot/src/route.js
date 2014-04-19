require('../vendor/angular');
require('../vendor/angular-route');

var ngModule = require('./angular-module.js');

ngModule.config(function ($routeProvider) {

    $routeProvider
        .when('/game', {
            templateUrl: 'templates/game.html'
        })
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

});