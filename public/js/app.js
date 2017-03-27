angular.module('myApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url:'/',
                templateUrl: "./js/login/login.html",
                controller:"loginCtrl"
              })
            .state('welcome', {
                url:'/welcome',
                templateUrl: "./js/welcome/welcome.html",
                controller:"welcomeCtrl"
              })

            .state('game', {
                url:'/game',
                templateUrl: "./js/game/game.html",
                controller:"game-controller"
              });

$urlRouterProvider
    .otherwise('/');

});
