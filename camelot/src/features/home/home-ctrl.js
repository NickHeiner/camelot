var ngModule = require('../../angular-module'),
    route = require('../../route'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel, goToRoute, $rootScope, gameUtils, withoutAngularFire) {

    bindModel(['games'], $scope, 'games', _.constant([]));

    $scope.$watch('games', function (games) {
        $scope.gamesForWinJs = _.map(withoutAngularFire(games), function (game, gameId) {
            return {
                id: gameId,
                game: game
            };
        });
    });

    function shouldShowNoGamesMessage() {
        return !_.isUndefined($scope.games) && _.isEmpty($scope.games);
    }

    function waitingOnCurrentPlayer(game) {
        return gameUtils.isTurnOf(game, $rootScope.currentUserId.id);
    }

    function notWaitingOnCurrentPlayer(game) {
        return !waitingOnCurrentPlayer(game) && !gameUtils.eitherPlayerHasWon(game);
    }

    function currentPlayerHasWon(game) {
        return gameUtils.userHasWon(game, $rootScope.currentUserId.id);
    }

    function currentPlayerHasLost(game) {
        return gameUtils.eitherPlayerHasWon(game) && !gameUtils.userHasWon(game, $rootScope.currentUserId.id);
    }
    
    $scope.shouldShowNoGamesMessage = shouldShowNoGamesMessage;
    $scope.goToNewGame = goToRoute.goToNewGame;
    $scope.waitingOnCurrentPlayer = waitingOnCurrentPlayer;
    $scope.notWaitingOnCurrentPlayer = notWaitingOnCurrentPlayer;
    $scope.currentPlayerHasWon = currentPlayerHasWon;
    $scope.currentPlayerHasLost = currentPlayerHasLost;

});