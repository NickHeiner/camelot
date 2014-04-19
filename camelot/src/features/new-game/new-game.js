var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.controller('NewGameCtrl', function ($scope, $rootScope, bindModel, createNewGame, getFirebaseBinding) {

    bindModel(['users'], $scope, 'users', _.constant({}));
    $scope.games = getFirebaseBinding('games');

    function getPossibleOpponents() {
        return _.omit($scope.users, $rootScope.currentUserId.id);
    }

    function shouldShowNoUsersMessage() {
        return _.isEmpty(getPossibleOpponents());
    }

    function startNewGameWith(user) {
        var newGame = createNewGame($rootScope.currentUserId.id, user.id);
        $scope.games.$add(newGame);
    }

    $scope.shouldShowNoUsersMessage = shouldShowNoUsersMessage;
    $scope.getPossibleOpponents = getPossibleOpponents;
    $scope.startNewGameWith = startNewGameWith;

});