angular.module('myApp')
.controller('game-controller',function($scope , gameService ){
$scope.play = gameService.play;
$scope.play();
})
