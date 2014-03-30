var ngModule = require('../angular-module');

console.log('directive');

ngModule.directive('johnsonBox', function () {

    console.log('inner directive');

    return {
        template: "<p>What's in your johnson box?</p>"
    };
});