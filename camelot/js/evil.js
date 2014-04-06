var _ = require('lodash');

var $ = window.jQuery = require('jquery');

var methodsToOverride = [
    'after',
    'append',
    'appendTo',
    'before',
    'empty',
    'html',
    'insertAfter',
    'insertBefore',
    'prepend',
    'prependTo'
];

methodsToOverride.forEach(function (methodName) {

        var origMethod = $.fn[methodName];

        $.fn[methodName] = function () {
            var self = this,
                args = arguments,
                result;

            MSApp.execUnsafeLocalFunction(function () {
                result = origMethod.apply(self, args);
            });

            return result;

        };

    });
