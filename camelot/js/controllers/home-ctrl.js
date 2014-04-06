var ngModule = require('../angular-module'),
    _ = require('lodash');

ngModule.controller('HomeCtrl', function ($scope, bindModel) {

    bindModel(['games'], $scope, 'games', _.constant([]));

});