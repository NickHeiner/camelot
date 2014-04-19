var ngModule = require('../../angular-module'),
    route = require('../../route'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel, goToRoute) {

    bindModel(['games'], $scope, 'games', _.constant([]));

    $scope.goToNewGame = goToRoute.goToNewGame();

});