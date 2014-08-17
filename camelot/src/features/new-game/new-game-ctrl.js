var ngModule = require('../../angular-module'),
    _ = require('lodash');

ngModule.controller('NewGameCtrl', function ($scope, $rootScope, bindModel, createNewGame, getFirebaseBinding, goToRoute) {

    bindModel(['users'], $scope, 'users', _.constant({}));
    $scope.games = getFirebaseBinding('games');

    function getPossibleOpponents() {
        return _.omit($scope.users, $rootScope.currentUserId.id);
    }

    function shouldShowNoUsersMessage() {
        return _.isEmpty(getPossibleOpponents());
    }

    function startNewGameWith(opponentId) {
        var newGame = createNewGame($rootScope.currentUserId.id, opponentId);
        $scope.games.$add(newGame).then(function (ref) {
            goToRoute.goToPlayGame({gameId: ref.name()});
        });
    }

    $scope.shouldShowNoUsersMessage = shouldShowNoUsersMessage;
    $scope.getPossibleOpponents = getPossibleOpponents;
    $scope.startNewGameWith = startNewGameWith;

});