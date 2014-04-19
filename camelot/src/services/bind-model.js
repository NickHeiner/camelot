var angularModule = require('../angular-module'),
    url = require('url'),   
    path = require('path');

angularModule
    /**
     * Namespace different schema versions to avoid conflicts in the future. 
     * I'm not sure if there's a better way to do this.
     */
    .constant('SCHEMA_VERSION', '1')
    .factory('getFirebaseUrl', function () {
        return function (pathname) {
            return url.format({
                pathname: pathname,
                protocol: 'https',
                host: 'camelot-nth.firebaseio.com'
            });
        };
    })
    .factory('getFirebaseBinding', function ($window, $firebase, SCHEMA_VERSION, getFirebaseUrl) {
        return function (childPath) {
            var pathname = path.join.apply(path, [SCHEMA_VERSION].concat(childPath)),
                firebaseRef = new $window.Firebase(getFirebaseUrl(pathname));

            return $firebase(firebaseRef);
        };
    })
    .factory('bindModel', function (getFirebaseBinding) {

        return function (childPath, $scope, scopeAttr, getDefault) {
            getFirebaseBinding(childPath).$bind($scope, scopeAttr, getDefault);
        };
});