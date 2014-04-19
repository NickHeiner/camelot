var angularModule = require('../angular-module'),
    route = require('../route'),
    _str = require('underscore.string'),
    _ = require('lodash');

angularModule.factory('goToRoute', function ($location) {
    return _(route)
        .map(function (routePath, routeName) {
            return ['goTo' + _str.capitalize(routeName), function () {
                $location.path(routePath);
            }];
        })
        .zipObject()
        .valueOf();
});