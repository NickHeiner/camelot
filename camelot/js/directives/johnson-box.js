var ngModule = require('../angular-module');

ngModule.directive('johnsonBox', function () {

    return {
        templateUrl: 'templates/johnson-box.html',
        scope: {
            user: '='
        }
    };
});