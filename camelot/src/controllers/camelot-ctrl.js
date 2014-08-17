var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($rootScope, auth, $scope, goToRoute) {

    auth($rootScope);

    $scope.goToHome = goToRoute.goToHome;
    
});