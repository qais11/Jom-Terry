'use strict';

angular.module('myApp').controller('mainCtrl', function ($scope, mainService, gameService, $state) {
  var sound = new Howl({
    src: ['../assets/sounds/theme.mp3'],
    volume: 0.5
  });

  $scope.toggleMusic = gameService.toggleMusic;

  $scope.reload = function () {
    location.reload(true);
  };
  $scope.goHome = function () {
    location.reload(true);
    location.assign(location.origin + "/#!/login");
  };
});