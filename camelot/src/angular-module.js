require('./evil');

require('../vendor/angular');
require('../vendor/angular-route');

// http://stackoverflow.com/questions/19828632/is-it-possible-to-use-firebase-with-a-windows-8-app
require('../vendor/firebase');
Firebase.INTERNAL.forceWebSockets();

require('../vendor/angularfire');
require('angular-winjs');

module.exports = angular.module('camelot', [
    'ngRoute', 
    'firebase',
    'winjs'
]);