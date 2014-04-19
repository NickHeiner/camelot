var ngModule = require('../../angular-module'),
    route = require('../../route'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel, goToRoute) {

    bindModel(['games'], $scope, 'games', _.constant([]));

    function shouldShowNoGamesMessage() {
        return _.isEmpty($scope.games);
    }

    $scope.shouldShowNoGamesMessage = shouldShowNoGamesMessage;
    $scope.goToNewGame = goToRoute.goToNewGame;

});