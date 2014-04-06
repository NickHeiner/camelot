/// <reference path="///LiveSDKHTML/js/wl.js" />

var ngModule = require('../angular-module'),
    _ = require('lodash');

ngModule.factory('auth', function ($q, $window, bindModel) {

    function prepareWindowsLive() {
        WL.init();

        return $q.when(WL.login({
            scope: 'wl.basic'
        }));
    }

    return function ($scope) {

        // This must be an object because $scope isn't the model itself; it points to the model.
        $scope.currentUserId = {};

        function getCurrentUser() {
            if (!_.has($scope.currentUserId, 'id')) {
                return null;
            }

            $scope.users[$scope.currentUserId.id] = $scope.users[$scope.currentUserId.id] || {};
            return $scope.users[$scope.currentUserId.id];
        }

        $scope.getCurrentUser = getCurrentUser;

        var bindUsersModelPromise = bindModel(['users'], $scope, 'users', _.constant({}));

        $q.all([bindUsersModelPromise, prepareWindowsLive()])
            .then(function () {

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
    };
});