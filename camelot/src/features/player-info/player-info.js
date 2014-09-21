var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.directive('playerInfo', function (bindModel) {
    return {
        template: require('./player-info.html'),
        scope: {
            playerId: '=',
            isTurn: '=',
            capturedPieces: '='
        },
        link: function ($scope) {
            $scope.$watch('playerId', function () {
                if (!$scope.playerId) {
                    return;
                }

                // TODO This is actually a fairly expensive operation and will introduce a visible loading delay.
                // Can we just save some common info like 'users' onto $rootScope?
                bindModel(['users', $scope.playerId], $scope, 'player', _.constant({}));
            });
        }
    };
});