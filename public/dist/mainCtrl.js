'use strict';

angular.module('myApp').controller('mainCtrl', function ($scope, mainService, $state) {
    $scope.test = mainService.test;
    $scope.reload = function () {
        location.reload(true);
    };
    $scope.goHome = function () {
        location.reload(true);
        location.assign(location.origin + "/#!/login");
    };
});