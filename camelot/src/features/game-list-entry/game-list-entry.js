var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.directive('gameListEntry', function (bindModel, $rootScope, getOtherPlayer, goToRoute) {
    return {
        template: require('./game-list-entry.html'),
        scope: {
            game: '=',
            gameId: '='
        },
        link: function ($scope) {
            
            function onGameOrUserChange(game, currentUserId) {

                if (_.isUndefined(game) || _.isUndefined(currentUserId)) {
                    return;
                }

                var otherUserId = getOtherPlayer(game, currentUserId);
                bindModel(['users', otherUserId], $scope, 'opponent', _.constant({}));
            }

            $scope.$watch('game', function (game) {
                return onGameOrUserChange(game, $rootScope.currentUserId.id);
            });

            $rootScope.$watch('currentUserId.id', function (currentUserId) {
                return onGameOrUserChange($scope.game, currentUserId);
            });

            function goToPlayGame() {
                goToRoute.goToPlayGame({ gameId: $scope.gameId });
            }

            $scope.goToPlayGame = goToPlayGame;
        }
    };
});