angular.module('myApp').service('gameService', function(){
this.play = function(){
   var app = new PIXI.Application(1500, 700, {backgroundColor : "#000"});
     document.body.appendChild(app.view);
     // create a new Sprite from an image path
     var jerry = PIXI.Sprite.fromImage('../assets/Jerry_scared.gif')

     // center the sprite's anchor point
     jerry.anchor.set(0.5);
     jerry.scale.set(0.5);
     jerry.position.y = 800;

     // move the sprite to the center of the screen
     jerry.x = app.renderer.width /2 ;

     app.stage.addChild(jerry);

     // Listen for animate update



     const mouseTracking= () => {
         document.onmousemove = handleMouseMove;
         function handleMouseMove(event) {
             var dot, eventDoc, doc, body, pageX, pageY;
             var log = console.log;
             event = event || window.event; // IE-ism

             // If pageX/Y aren't available and clientX/Y are,
             // calculate pageX/Y - logic taken from jQuery.
             // (This is to support old IE)
             if (event.pageX == null && event.clientX != null) {
                 eventDoc = (event.target && event.target.ownerDocument) || document;
                 doc = eventDoc.documentElement;
                 body = eventDoc.body;

                 event.pageX = event.clientX +
                   (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                   (doc && doc.clientLeft || body && body.clientLeft || 0);
                 event.pageY = event.clientY +
                   (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                   (doc && doc.clientTop  || body && body.clientTop  || 0 );
             }

             // Use event.pageX / event.pageY here
             app.ticker.add(function(delta) {
                 // just for fun, let's rotate mr rabbit a little
                 // delta is 1 if running at 100% performance
                 // creates frame-independent tranformation
                 jerry.position.x = event.pageX;
             });

         }
     };
     mouseTracking();
}
})
