'use strict';

var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ui.bootstrap', 'flash', 'restangular']);
awesomeApp.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
});