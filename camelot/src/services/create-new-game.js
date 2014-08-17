var angularModule = require('../angular-module'),
    camelotEngine = require('camelot-engine');

angularModule
    .factory('createNewGame', function () {
        return function (initiator, recepient) {
            return {
                players: [initiator, recepient],
                gameState: camelotEngine.createEmptyGame(),
                waitingOn: initiator,
                winner: null
            };
        };
    });