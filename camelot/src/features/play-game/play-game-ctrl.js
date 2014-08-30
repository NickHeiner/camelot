var angularModule = require('../../angular-module'),
    camelotQuery = require('camelot-engine')().query();
    _ = require('lodash');

angularModule.controller('PlayGameCtrl', function ($scope, $routeParams, bindModel) {
    bindModel(['games', $routeParams.gameId], $scope, 'game', _.constant({}));

    $scope.rows = [];
    $scope.cols = [];

    $scope.$watch('game', function (game) {

        var allBoardSpaces;

        if (!game) {
            return;
        }

        _allBoardSpaces = _(camelotQuery.getAllBoardSpaces(game.gameState));

        $scope.rows = _allBoardSpaces.pluck('row').unique().sortBy(_.identity).valueOf();
        $scope.cols = _allBoardSpaces.pluck('col').unique().sortBy(_.identity).valueOf();

        function boardSpaceDoesNotExist(row, col) {
            return camelotQuery.getBoardSpace(game.gameState, row, col) === null;
        }

        function getBoardSpaceClasses(row, col) {
            return {
                hidden: boardSpaceDoesNotExist(row, col),
                goal: camelotQuery.isGoal(game.gameState, row, col),
                friendly: _.noop,
                hostile: _.noop,
                knight: _.noop,
                pawn: _.noop,

                'possible-move': _.noop,
                'active-move': _.noop
            };
        }

        $scope.getBoardSpaceClasses = getBoardSpaceClasses;
    });
});