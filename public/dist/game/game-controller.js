'use strict';

angular.module('myApp').controller('game-controller', function ($scope, gameService) {
  gameService.play();
});