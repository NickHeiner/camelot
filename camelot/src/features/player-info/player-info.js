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

                bindModel(['users', $scope.playerId], $scope, 'player', _.constant({}));
            });
        }
    };
});