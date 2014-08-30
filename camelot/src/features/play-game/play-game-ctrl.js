﻿var angularModule = require('../../angular-module'),
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

        function isKnight(row, col) {
            // TODO have camelot-engine export constants
            var boardSpace = camelotQuery.getBoardSpace(game.gameState, row, col);
            return boardSpace && boardSpace.piece === 'knight';
        }

        function isPawn(row, col) {
            // TODO have camelot-engine export constants
            var boardSpace = camelotQuery.getBoardSpace(game.gameState, row, col);
            return boardSpace && boardSpace.piece === 'pawn';
        }

        function getBoardSpaceClasses(row, col) {
            return {
                hidden: boardSpaceDoesNotExist(row, col),
                goal: camelotQuery.isGoal(game.gameState, row, col),
                friendly: _.noop,
                hostile: _.noop,
                knight: isKnight(row, col),
                pawn: isPawn(row, col),

                'possible-move': _.noop,
                'active-move': _.noop
            };
        }

        $scope.getBoardSpaceClasses = getBoardSpaceClasses;
    });
});