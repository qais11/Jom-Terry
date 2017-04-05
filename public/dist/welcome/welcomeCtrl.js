'use strict';

angular.module('myApp').controller('welcomeCtrl', function ($scope, welcomeService) {
  $scope.getCurrentUser = welcomeService.getCurrentUser().then(function (response) {
    $scope.data = response.data;
  });
});