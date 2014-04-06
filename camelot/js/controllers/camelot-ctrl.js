/// <reference path="///LiveSDKHTML/js/wl.js" />

var ngModule = require('../angular-module');

ngModule.controller('CamelotCtrl', function ($scope, $q, $window) {

    $scope.user = {};

    WL.init();

    $q.when(WL.login({
        scope: 'wl.basic'
    })).then(function () {

        var updateUserNamePromise = $q.when(WL.api({
            path: 'me',
            method: 'GET'
        })).then(function (response) {
            $scope.user.name = response.name;
            $scope.user.id = response.id;
        });

        var updateUserPicturePromise = $q.when(WL.api({
            path: 'me/picture',
            method: 'GET'
        })).then(function (response) {
            $scope.user.avatarUri = response.location;
        });

        return $q.all([updateUserNamePromise, updateUserPicturePromise]);
    });
});