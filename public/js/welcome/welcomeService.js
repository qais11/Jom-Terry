angular.module('myApp')
.service('welcomeService' , function($http){
  this.getCurrentUser = ()=>{
    return $http({
             method: 'GET',
             url: '/getCurrentUser'
         });
       }
})
