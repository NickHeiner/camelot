var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.directive('gameListEntry', function (bindModel, $rootScope, getOtherPlayer) {
    return {
        template: require('./game-list-entry.html'),
        scope: {
            game: '='
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
        }
    };
});