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
    .factory('bindModel', function ($window, SCHEMA_VERSION, $firebase, getFirebaseUrl) {

        return function (childPath, $scope, scopeAttr, getDefault) {
            var pathname = path.join.apply(path, [SCHEMA_VERSION].concat(childPath)),
                firebaseRef = new $window.Firebase(getFirebaseUrl(pathname));

            $firebase(firebaseRef).$bind($scope, scopeAttr, getDefault);
        };
});