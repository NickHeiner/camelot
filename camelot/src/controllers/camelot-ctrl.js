var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($rootScope, auth, $scope, goToRoute) {

    auth($rootScope);

    $scope.goToHome = goToRoute.goToHome;
    $scope.getCurrentUser().then(function (user) {
        // We could use automate promise unwrapping here but that
        // feature is either deprecated already or will be soon.
        $scope.currentUser = user;
    });
});