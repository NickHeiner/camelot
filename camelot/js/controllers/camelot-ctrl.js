﻿/// <reference path="///LiveSDKHTML/js/wl.js" />

var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($scope, $q, $window, bindModel) {

    // This must be an object because $scope isn't the model itself; it points to the model.
    $scope.currentUserId = {};

    function getCurrentUser() {
        return $scope.users[$scope.currentUserId.id];
    }

    $scope.getCurrentUser = getCurrentUser;

    bindModel(['users'], $scope, 'users');

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

        var updateUserPicturePromise = $q.when(WL.api({
            path: 'me/picture',
            method: 'GET'
        })).then(function (response) {
            getCurrentUser().avatarUri = response.location;
        });

        return $q.all([updateUserNamePromise, updateUserPicturePromise]);
    });
    
});