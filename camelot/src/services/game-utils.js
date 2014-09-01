'use strict';

var angularModule = require('../angular-module'),
    camelotEngine = require('camelot-engine')(),
    _ = require('lodash'),
    camelotQuery = camelotEngine.query();

angularModule
    .factory('gameUtils', function () {
        function getPlayerForUserId(game, userId) {
            return _.invert(game.players)[userId];
        }
            
        function isTurnOf(game, userId) {
            return userId === game.waitingOn && !eitherPlayerHasWon(game);
        }

        function eitherPlayerHasWon(game) {
            return camelotQuery.getGameWinner(game.gameState) !== null;
        }

        function userHasWon(game, userId) {
            return camelotQuery.getGameWinner(game.gameState) === getPlayerForUserId(game, userId);
        }

        return {
            isTurnOf: isTurnOf,
            userHasWon: userHasWon,
            eitherPlayerHasWon: eitherPlayerHasWon,
            getPlayerForUserId: getPlayerForUserId
        };
    });