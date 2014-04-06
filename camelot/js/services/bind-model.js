var angularModule = require('../angular-module'),
    url = require('url'),   
    path = require('path');

angularModule
    .constant('SCHEMA_VERSION', '1')
    .factory('bindModel', function ($window, SCHEMA_VERSION, $firebase) {

        return function (childPath, $scope, scopeAttr) {
            var pathname = path.join.apply(path, [SCHEMA_VERSION].concat(childPath)),
                fullUrl = url.format({
                    pathname: pathname,
                    protocol: 'https',
                    host: 'camelot-nth.firebaseio.com'
                });

            var firebaseRef = new $window.Firebase(fullUrl);

            $firebase(firebaseRef).bind($scope, scopeAttr);
        };
});