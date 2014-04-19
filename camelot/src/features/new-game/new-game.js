var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.controller('NewGameCtrl', function ($scope, bindModel) {

    bindModel(['users'], $scope, 'users', _.constant({}));

    function shouldShowNoUsersMessage() {
        return _.isEmpty($scope.users);
    }

    $scope.shouldShowNoUsersMessage = shouldShowNoUsersMessage;

});