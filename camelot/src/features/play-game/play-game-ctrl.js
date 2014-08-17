var angularModule = require('../../angular-module'),
    _ = require('lodash');

angularModule.controller('PlayGameCtrl', function ($scope, $routeParams, bindModel) {
    bindModel(['games', $routeParams.gameId], $scope, 'game', _.constant({}));
});