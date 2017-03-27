angular.module('myApp')
.directive('logoAnimationDir' , function(){

  return {
    restrict: 'E'
   ,templateUrl:'/js/logo-animation.html'
   ,link : function(scope , element , attribute){
     $(document).ready(function(){
       $('.logo-img-container').animate({
         position:'static',
         top:0
       } , 1500)
     })
  }
}
});
