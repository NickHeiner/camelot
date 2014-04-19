var ngModule = require('../../angular-module');

ngModule.directive('johnsonBox', function () {

    return {
        template: require('./johnson-box.html'),
        scope: {
            user: '='
        }
    };
});