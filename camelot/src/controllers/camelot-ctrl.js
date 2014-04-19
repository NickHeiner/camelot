var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($rootScope, auth) {

    auth($rootScope);
    
});