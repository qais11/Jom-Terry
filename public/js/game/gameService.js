angular.module('myApp').service('gameService', function(){
this.play = function(){
   var app = new PIXI.Application( 1220 , 615 ,{ backgroundColor: 000 ,resolution: window.devicePixelRatio , autoResize: true});
   var scoreNum = 0;
   var score;
   var hit = false;
   var slipperArr = [];
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
          jerry.interactive = true;
          jerry.anchor.set(0.5);
          jerry.scale.set(0.5);
          jerry.width = app.view.width  / 10;
          jerry.height = app.view.height / 6;
          jerry.position.y = app.view.height/2.7 - (jerry.height / 2);
          jerry.x = -90 ;
          app.stage.addChildAt(jerry, 3)

          idle2 = setInterval(function(){
            if(rect2.x >= 650 * 4) {
              rect2.x = 0;
            }
            else{jerry.texture.frame = rect2;
            rect2.x += 650;
            }

          }, 80);

          setTimeout(()=>{
            app.ticker.add(function(delta) {
              // console.log(jerry.position.x , app.view.width - 120);
              if(jerry.position.x >= app.view.width + 120) {
                console.log('E');
                jerry.position.x = -800;
              }
              jerry.position.x += 5;
            })
          } , 4000)
//-----------------------------------------------------

    function jerryHit(){
      if(jerry.x >= pointer.x -15 || jerry.x >= pointer.x + 15){
        scoreNum += 50;
        score.setText(scoreNum)
        hit = true;
        jerry.x = -600;
        // console.log(hit, 2);
        setTimeout(function(){
          hit = false;
          console.log(hit, 2);
        } , 1000)

      }
    }

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
          tom.x = app.renderer.width /2 ;
          app.stage.on('pointerdown', onClick);
          app.stage.addChild(tom)

          animationLoop()
          function onClick(){
          jerryHit();
          console.log(hit , 1);
          moveTom();
          if(hit === false){
          slipperContainer.removeChild(slipperArr[slipperArr.length -1]);
          slipperArr.pop();
        }
        if(slipperArr.length === 0){
          gameOver();
        }


      }

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


      score = new PIXI.Text(scoreNum, {
          fontFamily:'Snippet',
          fontSize: 26,
          fill: '#000',
          stroke: '#C6A53C',
          strokeThickness: 2,
          align: 'left',
          fontWeight: 'bold'

      });
        score.anchor.set(0.5)
        score.position.x = app.view.width /2 - 140;
        score.position.y = app.view.height/11 - (score.height/2)




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


      var slipperContainer = new PIXI.Container();
      var slipperTexture = PIXI.Texture.fromImage('./assets/slipper.png');
      slipperArr = []
        for (var i = 0; i < 6; i++) {
            var slipper = new PIXI.Sprite(slipperTexture);
            slipperArr.push(slipper)
            slipper.anchor.set(0.5);
            slipper.width = 20;
            slipper.height = 30;
            slipper.x = (i % 6) * 40;
            slipperContainer.x = app.view.width /2 + 150;
            slipperContainer.y = app.view.height/ 10;
    }
    slipperArr.forEach(function(val){
      slipperContainer.addChild(val);
    });
    function gameOver(){
      document.getElementById('game-over').style.display = 'block';
      document.getElementById('game-over').style.cursor = 'auto';
      document.getElementById('game-over').style.outline= 'none';


    }

    var pointer = PIXI.Sprite.fromImage('../assets/pointer.png')
    // center the sprite's anchor point
      pointer.anchor.set(0.5);
      pointer.scale.set(0.5);
      pointer.position.y = app.view.height/3 - (pointer.height/2) - 15;
      // app.stage.addChild()             //ADDING SPRITES TO THE CANVAS


    //--------------------------------------
     app.stage.addChild(dashBoard, currentScore, HighScore, Attemps ,slipperContainer,  pointer ,score)

//-------------------------------------------

//------------------------------------------
     const mouseTracking = () => {
         document.onmousemove = handleMouseMove;
         function handleMouseMove(event) {
             var dot, eventDoc, doc, body, pageX, pageY;
             var log = console.log;
             event = event || window.event; // IE-ism

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

             app.ticker.add(function(delta) {
                 tom.position.x = event.pageX;
                 pointer.position.x = event.pageX;
             });
         }
     };

     mouseTracking();
}
})
