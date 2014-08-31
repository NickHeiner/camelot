var angularModule = require('../angular-module'),
    _ = require('lodash'),
    camelotEngine = require('camelot-engine')();

angularModule
    .factory('createNewGame', function () {
        return function (initiator, recepient) {

            var constants = camelotEngine.constants(),
                players = _.zipObject([
                    [constants.PLAYER_A, initiator],
                    [constants.PLAYER_B, recepient]
                ]);

            return {
                players: players,
                gameState: camelotEngine.createEmptyGame(),
                waitingOn: initiator,
                winner: null
            };
        };
    });