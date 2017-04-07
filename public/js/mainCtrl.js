angular.module('myApp')
.controller('mainCtrl',function($scope , mainService, gameService, $state){


  $scope.toggleMusic = gameService.toggleMusic;

$scope.reload = function () {
  location.reload(true)
}
$scope.goHome = function() {
    location.reload(true);
    location.assign(location.origin + "/#!/login")
}


});
