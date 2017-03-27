angular.module('myApp')
.controller('welcomeCtrl' , function($scope ,welcomeService ){
  $scope.test2 = welcomeService.test2
})
