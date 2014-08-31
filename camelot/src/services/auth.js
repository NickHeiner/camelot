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
            var deferred = $q.defer();

            function scopeIsPopulated() {
                return _.has($scope.currentUserId, 'id') && _.has($scope, 'users');
            }

            if (!scopeIsPopulated()) {

                var unregister = $scope.$watch(scopeIsPopulated, function (isPopulated) {
                    if (isPopulated) {
                        unregister();
                        $scope.users[$scope.currentUserId.id] = $scope.users[$scope.currentUserId.id] || {};
                        deferred.resolve($scope.users[$scope.currentUserId.id]);
                    }
                });

            } else {
                $scope.users[$scope.currentUserId.id] = $scope.users[$scope.currentUserId.id] || {};
                deferred.resolve($scope.users[$scope.currentUserId.id]);
            }

            return deferred.promise;
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

                    return getCurrentUser().then(function (user) {
                        user.name = response.name;
                    });
                });

                return updateUserNamePromise.then(function () {
                    return $q.when(WL.api({
                        path: 'me/picture',
                        method: 'GET'
                    })).then(function (response) {

                        getCurrentUser().then(function (user) {
                            user.avatarUri = response.location;
                        });

                    });
                });
            });
    };
});