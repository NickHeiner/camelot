var angularModule = require('../angular-module');

angularModule
    .factory('createNewGame', function () {
        return function (initiator, recepient) {
            return {
                players: [initiator, recepient],
                gameState: {},
                waitingOn: initiator,
                winner: null
            };
        };
    });