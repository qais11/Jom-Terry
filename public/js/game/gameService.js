angular.module('myApp').service('gameService', function(){
this.play = function(){
   var app = new PIXI.Application( 1220 , 615 ,{ backgroundColor: 000 ,resolution: window.devicePixelRatio , autoResize: true});
   var moveJerry
   //----------------------------
   var gameWrapper = document.querySelector("#game_body_wrapper")
   gameWrapper.appendChild(app.view);
   //------------------------------

    var texture = PIXI.Texture.fromImage('./assets/background2copy.jpg');
    var texture2 = new PIXI.Texture(texture)
    var tilingSprite = new PIXI.extras.TilingSprite(
    texture2 , app.renderer.width, app.renderer.height
    );

      tilingSprite.width = app.view.width ; // background possitioning
      tilingSprite.height =  app.view.height ; // background possitioning

      app.stage.addChild(tilingSprite);



      var container = new PIXI.Container()
      PIXI.loader
      .add('spritSheet1' , "../assets/tom/tom_sprite_sheet.png")
      .add('spritSheet2' , "../assets/jerry/jerry_sprite_sheet.png")
      .load(setup)

      var tom;
      var idle;
      var jerry;
      var idle2;
      function setup(){
          app.stage.interactive = true;
          var rect = new PIXI.Rectangle(0,0,900,1000 );
          var rect2 = new PIXI.Rectangle(0,0,650,650 );
          var texture = PIXI.loader.resources["spritSheet1"].texture;
          var texture2 = PIXI.loader.resources["spritSheet2"].texture;
          texture.frame = rect;
          tom = new PIXI.Sprite(texture)
          texture2.frame = rect2;
          jerry = new PIXI.Sprite(texture2)
          //
          moveJerry = function(){




            jerry.interactive = true;
            jerry.anchor.set(0.5);
            jerry.scale.set(0.5);
            jerry.width = app.view.width  / 10;
            jerry.height = app.view.height / 6;
            jerry.position.y = app.view.height/2.7 - (jerry.height / 2);
            // move the sprite to the center of the screen
            jerry.x = app.renderer.width /2 - 600 ;
            // app.stage.on('pointerdown', movejerry);
            app.stage.addChild(jerry)



              animationLoop()

          }
          idle2 = setInterval(function(){
            if(rect2.x >= 650 * 4) {
              rect2.x = 0;
            }
            else{jerry.texture.frame = rect2;
            rect2.x += 650;
            }

          }, 100);
          setInterval(()=>{
            jerry.position.x += 1
          },1)
          app.ticker.add(function(delta) {
            jerry.position.x += 1
          })
          setInterval(()=>{
            moveJerry()
          } , 4000)


// setInterval(function(){console.log(jerry.x)},500)

          //--------------------------------------------------- jeery's function finished
          function moveTom(){
            clearInterval(idle)
            idle = setInterval(function(){
              if(rect.x >= 900 * 5) {
                rect.x = 0;
              }
              else{tom.texture.frame = rect;
              rect.x += 900;
              }
            }, 70);

            setTimeout(()=>{
              rect.x = 0;
              clearInterval(idle);
            },490)
          }
          tom.interactive = true;
          tom.anchor.set(0.5);
          tom.scale.set(1);
          tom.width = app.view.width  / 2.5;
          tom.height = app.view.height / 1.5;
          tom.position.y = app.view.height  - (tom.height / 2);
          // move the sprite to the center of the screen
          tom.x = app.renderer.width /2 ;
          app.stage.on('pointerdown', moveTom);
          // app.stage.on('pointerdown', moveJerry);
          app.stage.addChild(tom)

          animationLoop()
      }
      //-----------------------------------

      //----------------------------------
      function animationLoop(){

        requestAnimationFrame(animationLoop);

        app.render(container);
      }


     //-------------------------------------------


//-------------------------------------------------

    //  app.state.addChild(jerryCage)
    var dashBoard = PIXI.Sprite.fromImage('../assets/dash-board.png')
      dashBoard.anchor.set(0.5);
      dashBoard.scale.set(0.5);
      dashBoard.position.x = app.view.width /2;
      dashBoard.position.y =  app.view.height /9 - (dashBoard.height/2) ;
      dashBoard.width = 1000;

    var currentScore = new PIXI.Text('Current Score :', {
        fontFamily:'Snippet',
        fontSize: 26,
        fill: '#000',
        stroke: '#C6A53C',
        strokeThickness: 2,
        align: 'left',
        fontWeight: 'bold'

    });
      currentScore.anchor.set(0.5)
      currentScore.position.x = app.view.width /2 - 250;
      currentScore.position.y = app.view.height/11 - (currentScore.height/2)

    var HighScore = new PIXI.Text('High Score :', {
        fontFamily:'Snippet',
        fontSize: 26,
        fill: '#000',
        stroke: '#C6A53C',
        strokeThickness: 2,
        align: 'left',
        fontWeight: 'bold'

    });

      HighScore.anchor.set(0.5)
      HighScore.position.x = app.view.width /2 -250;
      HighScore.position.y = app.view.height/6 - (currentScore.height/2);
      var Attemps = new PIXI.Text('Attemps :', {
          fontFamily:'Snippet',
          fontSize: 26,
          fill: '#000',
          stroke: '#C6A53C',
          strokeThickness: 2,
          align: 'left',
          fontWeight: 'bold'

      });
        Attemps.anchor.set(0.5)
        Attemps.position.x =app.view.width /2 + 80;
        Attemps.position.y = app.view.height/ 10 ;


      var container = new PIXI.Container();
      var slipperTexture = PIXI.Texture.fromImage('./assets/slipper.png');
      var slipperArr = []
        for (var i = 0; i < 6; i++) {
            var slipper = new PIXI.Sprite(slipperTexture);
            slipperArr.push(slipper)
            slipper.anchor.set(0.5);
            slipper.width = 20;
            slipper.height = 30;
            slipper.x = (i % 6) * 40;
            container.x = app.view.width /2 + 150;
            container.y = app.view.height/ 10;
    }
    slipperArr.forEach(function(val){
      container.addChild(val);
    });
    function losingAttemp() {
      container.removeChild(slipperArr[slipperArr.length -1]);
      slipperArr.pop();
      console.log(slipperArr);
    }

    var pointer = PIXI.Sprite.fromImage('../assets/pointer.png')
    // center the sprite's anchor point
      pointer.anchor.set(0.7);
      pointer.scale.set(0.5);
      pointer.position.y = app.view.height/3 - (pointer.height/2);
      app.stage.addChild(pointer)             //ADDING SPRITES TO THE CANVAS


    //--------------------------------------
     app.stage.addChild(dashBoard)
    //  app.stage.addChild(tom)
     app.stage.addChild(currentScore)
     app.stage.addChild(HighScore)
     app.stage.addChild(Attemps)
     app.stage.addChild(container)

//-------------------------------------------

//------------------------------------------
     const mouseTracking = () => {
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
                 tom.position.x = event.pageX;
                 pointer.position.x = event.pageX;
                //  pointer.position.y = event.pageY;
                // console.log(jerry.x);
                if (jerry.x >= 1220){
                  moveJerry();
                }
             });
         }
     };

     mouseTracking();
}
})
