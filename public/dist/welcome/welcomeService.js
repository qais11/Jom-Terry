'use strict';

angular.module('myApp').service('welcomeService', function ($http) {
  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/getCurrentUser'
    });
  };
});