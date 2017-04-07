angular.module('myApp').service('gameService', function($http){

  var sound = new Howl({
    src: ['../assets/sounds/theme.mp3'],
    volume: 0.5,
  });
  var id = sound.play()
  sound.loop(true);

  this.toggleMusic = function(bool){
    if (bool) {
        sound.pause(id)
    }
    else {
      sound.play(id)
    }

  };



this.play = function(){
  sound.stop(id)
  var gameMusic = new Howl({
      src: ['../assets/sounds/gameMusic.mp3'],
      volume: 0.3,
  });
    var id = gameMusic.play()
    gameMusic.loop(true);

    gameMusic.play(id)
   let app = new PIXI.Application( 1220 , 615 ,{ backgroundColor: "000" ,resolution: window.devicePixelRatio , autoResize: true});
   let scoreNum = 0;
   let score;
   let hit = false;
   let slipperArr = [];
   let highScoreNum =0;
   $http.get("/getHighScore").then((response)=>{
     highScoreNum = response.data.high_score
     Hscore.setText(highScoreNum)
   })
   //----------------------------
   let gameWrapper = document.querySelector("#game_body_wrapper")
   gameWrapper.appendChild(app.view);
   //------------------------------

    let texture = PIXI.Texture.fromImage('./assets/background2copy.jpg');
    let texture2 = new PIXI.Texture(texture)
    let tilingSprite = new PIXI.extras.TilingSprite(
    texture2 , app.renderer.width, app.renderer.height
    );

      tilingSprite.width = app.view.width ; // background possitioning
      tilingSprite.height =  app.view.height ; // background possitioning

      app.stage.addChild(tilingSprite);



      let container = new PIXI.Container()
      PIXI.loader
      .add('spritSheet1' , "../assets/tom/tom_sprite_sheet.png")
      .add('spritSheet2' , "../assets/jerry/jerry-sprit-sheet-cheese.png")
      .load(setup)

      let jerryScaredTexture;
      let tom;
      let idle;
      let jerry;
      let idle2;
      function setup(){
          app.stage.interactive = true;
          let rect = new PIXI.Rectangle(0,0,900,1000 );
          let rect2 = new PIXI.Rectangle(0,0,650,650 );
          let texture = PIXI.loader.resources["spritSheet1"].texture;
          let texture2 = PIXI.loader.resources["spritSheet2"].texture;
          texture.frame = rect;
          tom = new PIXI.Sprite(texture)
          texture2.frame = rect2;
          jerry = new PIXI.Sprite(texture2)

          jerry.interactive = true;
          jerry.anchor.set(0.5);
          jerry.scale.set(0.5);
          jerry.width = app.view.width  / 10;
          jerry.height = app.view.height / 6;
          jerry.position.y = app.view.height/2.7 - (jerry.height / 2);
          jerry.x = -90 ;
          app.stage.addChildAt(jerry, 3)

          idle2 = setInterval(function(){
            if(rect2.x >= 650 * 5) {
              rect2.x = 0;
            }
            else{jerry.texture.frame = rect2;
            rect2.x += 650;
            }

          }, 55.9);

          setTimeout(()=>{
            app.ticker.add(function(delta) {
              if(jerry.position.x >= app.view.width + 120) {
                jerry.position.x = -800;
              }
              jerry.position.x += 5;
            })
          } , 4000)
//-----------------------------------------------------

    jerryScaredTexture = PIXI.Texture.fromImage('../assets/jerry/jerry-hit.png');
    let jerryScared = new PIXI.Sprite(jerryScaredTexture);
    jerryScared.anchor.set(0.5);
    jerryScared.width = app.view.width  / 9;
    jerryScared.height = app.view.height / 5;

    var jerrySound = new Howl({
      src: ['../assets/sounds/jerryHit.wav'],
      volume: 0.5,
    });
    var id ;

    function jerryHit(){
      if(jerry.x >= pointer.x -10 && jerry.x <= pointer.x +10){
        scoreNum += 50;
        score.setText(scoreNum)
        hit = true;
        id = jerrySound.play()
        jerryScared.x = jerry.x
        jerryScared.y = jerry.y
        jerry.x = -600;
        setTimeout(function(){
          hit = false;
        } , 1000)
        app.stage.addChild(jerryScared)
        setTimeout(()=>{
          app.stage.removeChild(jerryScared)
        } , 1250)

      }
    }

//--------------------------------------------------- jeery's function finished
          function moveTom(){
            clearInterval(idle)
            idle = setInterval(()=>{
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
          moveTom();
          if(hit === false){
          slipperContainer.removeChild(slipperArr[slipperArr.length -1]);
          slipperArr.pop();
        }
        if(slipperArr.length === 0){
          $http.post("/updateHighScore" ,{score: scoreNum}).then((response)=>{
            highScoreNum = response.data
          })

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

    let dashBoard = PIXI.Sprite.fromImage('../assets/dash-board.png')
      dashBoard.anchor.set(0.5);
      dashBoard.scale.set(0.5);
      dashBoard.position.x = app.view.width /2;
      dashBoard.position.y =  app.view.height /9 - (dashBoard.height/2) ;
      dashBoard.width = 1000;

    let currentScore = new PIXI.Text('Current Score :', {
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

        let Hscore = new PIXI.Text(highScoreNum, {
            fontFamily:'Snippet',
            fontSize: 26,
            fill: '#000',
            stroke: '#C6A53C',
            strokeThickness: 2,
            align: 'left',
            fontWeight: 'bold'

        });
          Hscore.anchor.set(0.5)
          Hscore.position.x = app.view.width /2 - 160;
          Hscore.position.y = app.view.height/6 - (Hscore.height/2)

    let HighScore = new PIXI.Text('High Score :', {
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




      let Attemps = new PIXI.Text('Attemps :', {
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


      let slipperContainer = new PIXI.Container();
      let slipperTexture = PIXI.Texture.fromImage('./assets/slipper.png');
      slipperArr = []
        for (let i = 0; i < 6; i++) {
            let slipper = new PIXI.Sprite(slipperTexture);
            slipperArr.push(slipper)
            slipper.anchor.set(0.5);
            slipper.width = 20;
            slipper.height = 30;
            slipper.x = (i % 6) * 40;
            slipperContainer.x = app.view.width /2 + 150;
            slipperContainer.y = app.view.height/ 10;
    }
      slipperArr.forEach((val) =>{
      slipperContainer.addChild(val);
    });
    function gameOver(){
      gameMusic.stop(id)
      var gameOverM = new Howl({
          src: ['../assets/sounds/womp-womp.mp3'],
          volume: 0.5,
      });
        var id = gameOverM.play()

      document.getElementById('game-over').style.display = 'block';
      document.getElementById('game-over').style.cursor = 'auto';
      document.getElementById('game-over').style.outline= 'none';


    }

    let pointer = PIXI.Sprite.fromImage('../assets/pointer.png')
      pointer.anchor.set(0.5);
      pointer.scale.set(0.5);
      pointer.position.y = app.view.height/3 - (pointer.height/2) - 15;



    //--------------------------------------
     app.stage.addChild(dashBoard, currentScore, HighScore ,  Hscore, Attemps ,slipperContainer,  pointer ,score)

//-------------------------------------------

//------------------------------------------
     const mouseTracking = () => {
         document.onmousemove = handleMouseMove;
         function handleMouseMove(event) {
             let dot, eventDoc, doc, body, pageX, pageY;
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

             app.ticker.add((delta)=> {
                 tom.position.x = event.pageX;
                 pointer.position.x = event.pageX;
             });
         }
     };

     mouseTracking();
}
})
