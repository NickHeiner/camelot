require('../vendor/angular');
require('../vendor/angular-route');

var ngModule = require('./angular-module.js');

ngModule.config(function ($routeProvider) {

    $routeProvider
        .when('/game', {
            template: require('../templates/game.html')
        })
        .when('/home', {
            template: require('./features/home/home.html'),
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

});