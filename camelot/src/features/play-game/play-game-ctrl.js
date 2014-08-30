var angularModule = require('../../angular-module'),
    _ = require('lodash');

angularModule.controller('PlayGameCtrl', function ($scope, $routeParams, bindModel) {
    bindModel(['games', $routeParams.gameId], $scope, 'game', _.constant({}));

    $scope.rows = [];
    $scope.cols = [];

    $scope.$watch('game', function (game) {

        if (!game) {
            return;
        }

        $scope.rows = _(game.gameState.boardSpaces).pluck('row').unique().sortBy(_.identity).valueOf();
        $scope.cols = _(game.gameState.boardSpaces).pluck('col').unique().sortBy(_.identity).valueOf();

        function boardSpaceDoesNotExist(row, col) {
            return !_.any(game.gameState.boardSpaces, { row: row, col: col });
        }

        function getBoardSpaceClasses(row, col) {
            return {
                hidden: boardSpaceDoesNotExist(row, col)
            };
        }

        $scope.getBoardSpaceClasses = getBoardSpaceClasses;
    });
});