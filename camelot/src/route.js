require('../vendor/angular');
require('../vendor/angular-route');

var ngModule = require('./angular-module.js'),
    paths = {
        newGame: '/new-game',
        game: '/game',
        home: '/home'
    };

ngModule.config(function ($routeProvider) {

    $routeProvider
        .when(paths.game, {
            template: require('../templates/game.html')
        })
        .when(paths.home, {
            template: require('./features/home/home.html'),
            controller: 'HomeCtrl'
        })
        .when(paths.newGame, {
            template: require('./features/new-game/new-game.html'),
            controller: 'NewGameCtrl'
        })
        .otherwise({
            redirectTo: paths.home
        });

});

module.exports = paths;