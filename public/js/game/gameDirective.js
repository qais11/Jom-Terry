angular.module('myApp')
.directive('gameDirective' , function(){

    return {
      restrict: 'E'
     , templateUrl:'./js/game/game.html'
    //  ,controller: 'game-controller'
     ,link : function(scope){
    }
  }
})
