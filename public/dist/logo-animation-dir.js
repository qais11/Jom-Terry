'use strict';

angular.module('myApp').directive('logoAnimationDir', function () {

  return {
    restrict: 'E',
    templateUrl: '/js/logo-animation.html',
    link: function link(scope, element, attribute) {
      $(document).ready(function () {
        $('.logo-img-container').animate({
          position: 'static',
          top: 0
        }, 1500);

        $('#btn').click(function () {
          $('#btn').toggleClass('fa-volume-off');
          $('#btn').toggleClass('fa-volume-up');
        });
      });
    }
  };
});