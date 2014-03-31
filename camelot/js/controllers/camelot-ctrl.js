var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($scope) {
    $scope.user = {
        name: 'Nick Heiner',
        avatarUri: 'https://avatars1.githubusercontent.com/u/829827?s=460'
    };
});