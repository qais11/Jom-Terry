angular.module('myApp')
.controller('welcomeCtrl' , function($scope ,welcomeService ){
  $scope.getCurrentUser = welcomeService.getCurrentUser()
  .then((response)=>{
      $scope.data = response.data
    return response;
  })
})
