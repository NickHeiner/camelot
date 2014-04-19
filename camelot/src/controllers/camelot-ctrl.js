/// <reference path="///LiveSDKHTML/js/wl.js" />

var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($scope, auth) {

    auth($scope);
    
});