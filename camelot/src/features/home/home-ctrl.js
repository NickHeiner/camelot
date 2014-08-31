var ngModule = require('../../angular-module'),
    route = require('../../route'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel, goToRoute, $rootScope, gameUtils, withoutAngularFire) {

    bindModel(['games'], $scope, 'games', _.constant([]));

    $scope.$watch('games', function (games) {

        var categories = [
                {
                    name: 'Your turn',
                    pred: waitingOnCurrentPlayer
                },
                {
                    name: 'Their turn',
                    pred: waitingOnOtherPlayer,
                },
                {
                    name: 'You won',
                    class: 'you-won',
                    pred: currentPlayerHasWon,
                },
                {
                    name: 'You lost',
                    class: 'you-lost',
                    pred: currentPlayerHasLost
                }
            ],
            gameEntries = _.map(withoutAngularFire(games), function (game, gameId) {
                return {
                    id: gameId,
                    game: game
                };
            });

        $scope.listLayout = WinJS.UI.ListLayout;

        $scope.gamesByCategory = _.map(categories, function (category) {
            return {
                name: category.name,
                class: category.class,
                games: _.filter(gameEntries, function (gameEntry) {
                    return category.pred(gameEntry.game);
                })
            };
        });
    });

    function shouldShowNoGamesMessage() {
        return !_.isUndefined($scope.games) && _.isEmpty($scope.games);
    }

    function waitingOnCurrentPlayer(game) {
        return gameUtils.isTurnOf(game, $rootScope.currentUserId.id);
    }

    function waitingOnOtherPlayer(game) {
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

});