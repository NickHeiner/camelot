'use strict';

var angularModule = require('../angular-module'),
    camelotEngine = require('camelot-engine')(),
    _ = require('lodash'),
    camelotQuery = camelotEngine.query();

angularModule
    .factory('withoutAngularFire', function () {
        return function (obj) {
            return _.omit(obj, function (val, key) {
                return key[0] === '$';
            });
        };
    });