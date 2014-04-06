/// <reference path="///LiveSDKHTML/js/wl.js" />

var ngModule = require('../angular-module'),
    _ = require('lodash');

ngModule.controller('CamelotCtrl', function ($scope, $q, $window, bindModel) {

    // This must be an object because $scope isn't the model itself; it points to the model.
    $scope.currentUserId = {};

    function getCurrentUser() {
        $scope.users[$scope.currentUserId.id] = $scope.users[$scope.currentUserId.id] || {};
        return $scope.users[$scope.currentUserId.id];
    }

    $scope.getCurrentUser = getCurrentUser;

    bindModel(['users'], $scope, 'users', _.constant({}));

    WL.init();

    $q.when(WL.login({
        scope: 'wl.basic'
    })).then(function () {

        var updateUserNamePromise = $q.when(WL.api({
            path: 'me',
            method: 'GET'
        })).then(function (response) {

            $scope.currentUserId.id = response.id;

            getCurrentUser().name = response.name;
        });

        return updateUserNamePromise.then(function () {
            return $q.when(WL.api({
                path: 'me/picture',
                method: 'GET'
            })).then(function (response) {
                getCurrentUser().avatarUri = response.location;
            });
        });
    });
    
});