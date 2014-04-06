var ngModule = require('../angular-module');

ngModule.controller('HomeCtrl', function ($scope) {

    $scope.games = [
        {
            playerA: {
                name: 'Scott'
            },
            playerB: {
                name: 'Nick'
            },
            waitingOn: 'playerB'
        },
        {
            playerA: {
                name: 'Nick'
            },
            playerB: {
                name: 'Dad'
            },
            waitingOn: 'playerB'
        },
        {
            playerA: {
                name: 'Nick'
            },
            playerB: {
                name: 'Katherine'
            },
            waitingOn: 'playerA'
        }
    ];
});