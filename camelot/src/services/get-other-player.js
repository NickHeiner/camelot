var angularModule = require('../angular-module'),
    _ = require('lodash');

angularModule
    .factory('getOtherPlayer', function () {
        return function (game, currentUserId) {
            if (!_.isString(currentUserId)) {
                throw new Error('currentUserId must be a string, but was: `' + currentUserId + '`');
            }

            return _(game.players).without(currentUserId).first();
        };
    });