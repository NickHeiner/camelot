var angularModule = require('../../angular-module'),
    camelotEngine = require('camelot-engine')(),
    camelotQuery = camelotEngine.query(),
    camelotConstants = camelotEngine.constants(),
    _ = require('lodash');

angularModule.controller('PlayGameCtrl', function ($scope, $routeParams, bindModel, $rootScope, getOtherPlayer) {
    bindModel(['games', $routeParams.gameId], $scope, 'game', _.constant({}));

    $scope.rows = [];
    $scope.cols = [];
    $scope.activeMoveCoords = [];

    $scope.$watch('game', function (game) {

        var allBoardSpaces,
            playerForCurrentUser,
            otherUserId,
            playerForOpponent;

        if (!game) {
            return;
        }

        function getPlayerForUserId(userId) {
            return _.invert(game.players)[userId];
        }

        // TODO Is it always safe to assume that currentUserId will be available at this point?
        playerForCurrentUser = getPlayerForUserId($rootScope.currentUserId.id);
        otherUserId = getOtherPlayer(game, $rootScope.currentUserId.id);
        playerForOpponent = getPlayerForUserId(otherUserId);

        _allBoardSpaces = _(camelotQuery.getAllBoardSpaces(game.gameState));

        $scope.rows = _allBoardSpaces.pluck('row').unique().sortBy(_.identity).valueOf();
        $scope.cols = _allBoardSpaces.pluck('col').unique().sortBy(_.identity).valueOf();

        function boardSpaceDoesNotExist(row, col) {
            return camelotQuery.getBoardSpace(game.gameState, row, col) === null;
        }

        function boardSpacePieceMatches(row, col, key, val) {
            var boardSpace = camelotQuery.getBoardSpace(game.gameState, row, col);
            return boardSpace && boardSpace.piece && boardSpace.piece[key] === val;
        }

        function getBoardSpaceClasses(row, col) {
            return {
                hidden: boardSpaceDoesNotExist(row, col),
                goal: camelotQuery.isGoal(game.gameState, row, col),
                friendly: boardSpacePieceMatches(row, col, 'player', playerForCurrentUser),
                hostile: boardSpacePieceMatches(row, col, 'player', playerForOpponent),
                knight: boardSpacePieceMatches(row, col, 'type', camelotConstants.KNIGHT),
                pawn: boardSpacePieceMatches(row, col, 'type', camelotConstants.PAWN),

                'possible-move': _.noop,
                'active-move': spaceIsInActiveMoves(row, col)
            };
        }

        function spaceIsInActiveMoves(row, col) {
            return _.find($scope.activeMoveCoords, { row: row, col: col });
        }

        function onClickBoardSpace(row, col) {
            var isPieceForCurrentPlayer = boardSpacePieceMatches(row, col, 'player', playerForCurrentUser),
                currCoord;

            if (!isPieceForCurrentPlayer && !$scope.activeMoveCoords.length) {
                return;
            }

            currCoord = { row: row, col: col };

            if (!camelotQuery.isValidMove(game.gameState, $scope.activeMoveCoords.concat(currCoord))) {
                return;
            }

            $scope.activeMoveCoords.push(currCoord);
        }

        $scope.getBoardSpaceClasses = getBoardSpaceClasses;
        $scope.onClickBoardSpace = onClickBoardSpace;
    });
});