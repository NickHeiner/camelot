var angularModule = require('../../angular-module'),
    camelotEngine = require('camelot-engine')(),
    camelotQuery = camelotEngine.query(),
    camelotUpdate = camelotEngine.update(),
    camelotConstants = camelotEngine.constants(),
    _ = require('lodash');

angularModule.controller('PlayGameCtrl', function ($scope, $routeParams, bindModel, $rootScope, getOtherPlayer, gameUtils) {
    bindModel(['games', $routeParams.gameId], $scope, 'game', _.constant({}));

    $scope.rows = [];
    $scope.cols = [];
    $scope.activeMoveCoords = [];

    $scope.$watch('game', function (game) {

        var _allBoardSpaces;

        if (!game) {
            return;
        }

        $rootScope.getCurrentUser().then(function (currentUserId) {
            var otherUserId = getOtherPlayer(game, $rootScope.currentUserId.id),
                playerForCurrentUser,
                playerForOpponent;

            $scope.ids = {
                opponent: otherUserId,
                current: $rootScope.currentUserId.id
            };

            $scope.isCurrentPlayerTurn = _.partial(gameUtils.isTurnOf, game, $rootScope.currentUserId.id);
            $scope.currentPlayerHasWon = _.partial(gameUtils.userHasWon, game, $rootScope.currentUserId.id);
            $scope.opponentHasWon = _.partial(gameUtils.userHasWon, game, otherUserId);
            $scope.isOpponentTurn = _.partial(gameUtils.isTurnOf, game, otherUserId);

            playerForCurrentUser = gameUtils.getPlayerForUserId(game, $rootScope.currentUserId.id);
            playerForOpponent = gameUtils.getPlayerForUserId(game, otherUserId);

            function getBoardSpaceClasses(row, col) {
                return {
                    hidden: boardSpaceDoesNotExist(row, col),
                    goal: camelotQuery.isGoal(game.gameState, row, col),
                    friendly: boardSpacePieceMatches(row, col, 'player', playerForCurrentUser),
                    hostile: boardSpacePieceMatches(row, col, 'player', playerForOpponent),
                    knight: boardSpacePieceMatches(row, col, 'type', camelotConstants.KNIGHT),
                    pawn: boardSpacePieceMatches(row, col, 'type', camelotConstants.PAWN),

                    'possible-move': shouldShowMoveAsPossible(row, col),
                    'active-move': boardSpaceIsInActiveMoves(row, col)
                };
            }

            function boardSpaceIsInPossibleMoves(row, col) {
                return camelotQuery.isValidMove(game.gameState, $scope.activeMoveCoords.concat({ row: row, col: col }), playerForCurrentUser);
            }

            function shouldShowMoveAsPossible(row, col) {
                return $scope.activeMoveCoords.length && boardSpaceIsInPossibleMoves(row, col);
            }

            function onClickBoardSpace(row, col) {
                var isPieceForCurrentPlayer;

                if (!$scope.isCurrentPlayerTurn()) {
                    return;
                }

                isPieceForCurrentPlayer = boardSpacePieceMatches(row, col, 'player', playerForCurrentUser);

                if (!isPieceForCurrentPlayer && !$scope.activeMoveCoords.length) {
                    return;
                }

                if (!boardSpaceIsInPossibleMoves(row, col)) {
                    return;
                }

                $scope.activeMoveCoords.push({ row: row, col: col });
            }

            $scope.onClickBoardSpace = onClickBoardSpace;
            $scope.getBoardSpaceClasses = getBoardSpaceClasses;
        });

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

        function boardSpaceIsInActiveMoves(row, col) {
            return _.find($scope.activeMoveCoords, { row: row, col: col });
        }

        function clearMove() {
            $scope.activeMoveCoords = [];
        }

        function submitMove() {
            var nextPlayerToMove;
            if (!$scope.activeMoveCoords.length || !$scope.isCurrentPlayerTurn()) {
                return;
            }

            $scope.game.gameState = camelotUpdate.applyMoves(game.gameState, $scope.activeMoveCoords);
            nextPlayerToMove = getOtherPlayer(game, game.waitingOn);
            game.waitingOn = nextPlayerToMove;
            clearMove();
        }
        
        function disableSubmitMove() {
            return $scope.activeMoveCoords.length <= 1;
        }

        function disableClearMove() {
            return $scope.activeMoveCoords.length < 1;
        }

        function capturePiecesOfPlayerId(playerId) {
            if (!playerId) {
                return null;
            }

            var playerName = _.invert(game.players)[playerId];
            return game.gameState.capturedPieces[playerName];
        }

        $scope.clearMove = clearMove;
        $scope.submitMove = submitMove;
        $scope.disableSubmitMove = disableSubmitMove;
        $scope.disableClearMove = disableClearMove;
        $scope.capturePiecesOfPlayerId = capturePiecesOfPlayerId;
    });
});