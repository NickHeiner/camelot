var ngModule = require('../../angular-module'),
    route = require('../../route'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel, goToRoute, $rootScope) {

    bindModel(['games'], $scope, 'games', _.constant([]));

    function shouldShowNoGamesMessage() {
        return !_.isUndefined($scope.games) && _.isEmpty($scope.games);
    }

    function waitingOnCurrentPlayer(game) {
        return game.waitingOn === $rootScope.currentUserId.id;
    }

    function notWaitingOnCurrentPlayer(game) {
        return !waitingOnCurrentPlayer(game);
    }

    $scope.shouldShowNoGamesMessage = shouldShowNoGamesMessage;
    $scope.goToNewGame = goToRoute.goToNewGame;
    $scope.waitingOnCurrentPlayer = waitingOnCurrentPlayer;
    $scope.notWaitingOnCurrentPlayer = notWaitingOnCurrentPlayer;

});