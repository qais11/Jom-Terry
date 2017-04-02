angular.module('myApp')
.controller('welcomeCtrl' , function($scope ,welcomeService ){
  $scope.getCurrentUser = welcomeService.getCurrentUser()
  .then(function(response){
      $scope.data = response.data
    console.log(response);
    return response;
  })
})
