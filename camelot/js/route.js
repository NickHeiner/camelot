require('../vendor/angular');
require('../vendor/angular-route');

var ngModule = require('./angular-module.js');

ngModule.config(function ($routeProvider) {

    $routeProvider
        .when('/game', {
            template: '<h1>Game page</h1>'
        })
        .when('/home', {
            template: '<h1>Home</h1>'
        })
        .otherwise({
            redirectTo: '/home'
        });

});