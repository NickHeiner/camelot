var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.controller('NewGameCtrl', function ($scope, $rootScope, bindModel) {

    bindModel(['users'], $scope, 'users', _.constant({}));

    function getPossibleOpponents() {
        return _.omit($scope.users, $rootScope.currentUserId.id);
    }

    function shouldShowNoUsersMessage() {
        return _.isEmpty(getPossibleOpponents());
    }

    $scope.shouldShowNoUsersMessage = shouldShowNoUsersMessage;
    $scope.getPossibleOpponents = getPossibleOpponents;

});