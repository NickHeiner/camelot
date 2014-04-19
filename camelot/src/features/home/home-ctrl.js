var ngModule = require('../../angular-module'),
    route = require('../../route'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel, $location) {

    bindModel(['games'], $scope, 'games', _.constant([]));

    function goToNewGame() {
        $location.path(route.newGame);
    }

    $scope.goToNewGame = goToNewGame;

});