require('./evil');

require('../vendor/angular');
require('../vendor/angular-route');
require('../vendor/firebase');
require('../vendor/angularfire');
require('../vendor/angular-winjs');

module.exports = angular.module('camelot', [
    'ngRoute', 
    'firebase'
]);