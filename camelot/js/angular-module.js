require('./evil');

require('../vendor/angular');
require('../vendor/angular-route');
require('../vendor/firebase');
require('../vendor/angularfire');

module.exports = angular.module('camelot', [
    'ngRoute', 
    'firebase'
]);