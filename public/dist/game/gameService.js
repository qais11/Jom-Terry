'use strict';

angular.module('myApp').service('gameService', function ($http) {

  var sound = new Howl({
    src: ['../assets/sounds/theme.mp3'],
    volume: 0.5
  });
  var id = sound.play();
  sound.loop(true);

  this.toggleMusic = function (bool) {
    if (bool) {
      sound.pause(id);
    } else {
      sound.play(id);
    }
  };

  var self = this;
  this.gamePlayTheme;

  this.play = function () {
    self.toggleMusic.pause(id);
    // selef.gamePlayTheme.play()
    var app = new PIXI.Application(1220, 615, { backgroundColor: "000", resolution: window.devicePixelRatio, autoResize: true });
    var scoreNum = 0;
    var score = void 0;
    var hit = false;
    var slipperArr = [];
    var highScoreNum = 0;
    $http.get("/getHighScore").then(function (response) {
      highScoreNum = response.data.high_score;
      Hscore.setText(highScoreNum);
    });
    //----------------------------
    var gameWrapper = document.querySelector("#game_body_wrapper");
    gameWrapper.appendChild(app.view);
    //------------------------------

    var texture = PIXI.Texture.fromImage('./assets/background2copy.jpg');
    var texture2 = new PIXI.Texture(texture);
    var tilingSprite = new PIXI.extras.TilingSprite(texture2, app.renderer.width, app.renderer.height);

    tilingSprite.width = app.view.width; // background possitioning
    tilingSprite.height = app.view.height; // background possitioning

    app.stage.addChild(tilingSprite);

    var container = new PIXI.Container();
    PIXI.loader.add('spritSheet1', "../assets/tom/tom_sprite_sheet.png").add('spritSheet2', "../assets/jerry/jerry-sprit-sheet-cheese.png").load(setup);

    var jerryScaredTexture = void 0;
    var tom = void 0;
    var idle = void 0;
    var jerry = void 0;
    var idle2 = void 0;
    function setup() {
      app.stage.interactive = true;
      var rect = new PIXI.Rectangle(0, 0, 900, 1000);
      var rect2 = new PIXI.Rectangle(0, 0, 650, 650);
      var texture = PIXI.loader.resources["spritSheet1"].texture;
      var texture2 = PIXI.loader.resources["spritSheet2"].texture;
      texture.frame = rect;
      tom = new PIXI.Sprite(texture);
      texture2.frame = rect2;
      jerry = new PIXI.Sprite(texture2);
      //
      jerry.interactive = true;
      jerry.anchor.set(0.5);
      jerry.scale.set(0.5);
      jerry.width = app.view.width / 10;
      jerry.height = app.view.height / 6;
      jerry.position.y = app.view.height / 2.7 - jerry.height / 2;
      jerry.x = -90;
      app.stage.addChildAt(jerry, 3);

      idle2 = setInterval(function () {
        if (rect2.x >= 650 * 6) {
          rect2.x = 0;
        } else {
          jerry.texture.frame = rect2;
          rect2.x += 650;
        }
      }, 55.5);

      setTimeout(function () {
        app.ticker.add(function (delta) {
          if (jerry.position.x >= app.view.width + 120) {
            jerry.position.x = -800;
          }
          jerry.position.x += 5;
        });
      }, 4000);
      //-----------------------------------------------------

      jerryScaredTexture = PIXI.Texture.fromImage('../assets/jerry/jerry-hit.png');
      var jerryScared = new PIXI.Sprite(jerryScaredTexture);
      jerryScared.anchor.set(0.5);
      jerryScared.width = app.view.width / 9;
      jerryScared.height = app.view.height / 5;

      var jerrySound = new Howl({
        src: ['../assets/sounds/jerryHit.wav'],
        volume: 0.5
      });
      var id;

      function jerryHit() {
        if (jerry.x >= pointer.x - 10 && jerry.x <= pointer.x + 10) {
          scoreNum += 50;
          score.setText(scoreNum);
          hit = true;
          id = jerrySound.play();
          jerryScared.x = jerry.x;
          jerryScared.y = jerry.y;
          jerry.x = -600;
          setTimeout(function () {
            hit = false;
          }, 1000);
          app.stage.addChild(jerryScared);
          setTimeout(function () {
            app.stage.removeChild(jerryScared);
          }, 1250);
        }
      }

      //--------------------------------------------------- jeery's function finished
      function moveTom() {
        clearInterval(idle);
        idle = setInterval(function () {
          if (rect.x >= 900 * 5) {
            rect.x = 0;
          } else {
            tom.texture.frame = rect;
            rect.x += 900;
          }
        }, 70);

        setTimeout(function () {
          rect.x = 0;
          clearInterval(idle);
        }, 490);
      }
      tom.interactive = true;
      tom.anchor.set(0.5);
      tom.scale.set(1);
      tom.width = app.view.width / 2.5;
      tom.height = app.view.height / 1.5;
      tom.position.y = app.view.height - tom.height / 2;
      tom.x = app.renderer.width / 2;
      app.stage.on('pointerdown', onClick);
      app.stage.addChild(tom);

      animationLoop();
      function onClick() {
        jerryHit();
        moveTom();
        if (hit === false) {
          slipperContainer.removeChild(slipperArr[slipperArr.length - 1]);
          slipperArr.pop();
        }
        if (slipperArr.length === 0) {
          $http.post("/updateHighScore", { score: scoreNum }).then(function (response) {
            highScoreNum = response.data;
          });

          gameOver();
        }
      }
    }
    //-----------------------------------

    //----------------------------------
    function animationLoop() {

      requestAnimationFrame(animationLoop);

      app.render(container);
    }

    //-------------------------------------------


    //-------------------------------------------------

    //  app.state.addChild(jerryCage)
    var dashBoard = PIXI.Sprite.fromImage('../assets/dash-board.png');
    dashBoard.anchor.set(0.5);
    dashBoard.scale.set(0.5);
    dashBoard.position.x = app.view.width / 2;
    dashBoard.position.y = app.view.height / 9 - dashBoard.height / 2;
    dashBoard.width = 1000;

    var currentScore = new PIXI.Text('Current Score :', {
      fontFamily: 'Snippet',
      fontSize: 26,
      fill: '#000',
      stroke: '#C6A53C',
      strokeThickness: 2,
      align: 'left',
      fontWeight: 'bold'

    });
    currentScore.anchor.set(0.5);
    currentScore.position.x = app.view.width / 2 - 250;
    currentScore.position.y = app.view.height / 11 - currentScore.height / 2;

    score = new PIXI.Text(scoreNum, {
      fontFamily: 'Snippet',
      fontSize: 26,
      fill: '#000',
      stroke: '#C6A53C',
      strokeThickness: 2,
      align: 'left',
      fontWeight: 'bold'

    });
    score.anchor.set(0.5);
    score.position.x = app.view.width / 2 - 140;
    score.position.y = app.view.height / 11 - score.height / 2;

    var Hscore = new PIXI.Text(highScoreNum, {
      fontFamily: 'Snippet',
      fontSize: 26,
      fill: '#000',
      stroke: '#C6A53C',
      strokeThickness: 2,
      align: 'left',
      fontWeight: 'bold'

    });
    Hscore.anchor.set(0.5);
    Hscore.position.x = app.view.width / 2 - 160;
    Hscore.position.y = app.view.height / 6 - Hscore.height / 2;

    var HighScore = new PIXI.Text('High Score :', {
      fontFamily: 'Snippet',
      fontSize: 26,
      fill: '#000',
      stroke: '#C6A53C',
      strokeThickness: 2,
      align: 'left',
      fontWeight: 'bold'

    });
    HighScore.anchor.set(0.5);
    HighScore.position.x = app.view.width / 2 - 250;
    HighScore.position.y = app.view.height / 6 - currentScore.height / 2;

    var Attemps = new PIXI.Text('Attemps :', {
      fontFamily: 'Snippet',
      fontSize: 26,
      fill: '#000',
      stroke: '#C6A53C',
      strokeThickness: 2,
      align: 'left',
      fontWeight: 'bold'

    });
    Attemps.anchor.set(0.5);
    Attemps.position.x = app.view.width / 2 + 80;
    Attemps.position.y = app.view.height / 10;

    var slipperContainer = new PIXI.Container();
    var slipperTexture = PIXI.Texture.fromImage('./assets/slipper.png');
    slipperArr = [];
    for (var i = 0; i < 6; i++) {
      var slipper = new PIXI.Sprite(slipperTexture);
      slipperArr.push(slipper);
      slipper.anchor.set(0.5);
      slipper.width = 20;
      slipper.height = 30;
      slipper.x = i % 6 * 40;
      slipperContainer.x = app.view.width / 2 + 150;
      slipperContainer.y = app.view.height / 10;
    }
    slipperArr.forEach(function (val) {
      slipperContainer.addChild(val);
    });
    function gameOver() {
      document.getElementById('game-over').style.display = 'block';
      document.getElementById('game-over').style.cursor = 'auto';
      document.getElementById('game-over').style.outline = 'none';
    }

    var pointer = PIXI.Sprite.fromImage('../assets/pointer.png');
    // center the sprite's anchor point
    pointer.anchor.set(0.5);
    pointer.scale.set(0.5);
    pointer.position.y = app.view.height / 3 - pointer.height / 2 - 15;
    // app.stage.addChild()             //ADDING SPRITES TO THE CANVAS


    //--------------------------------------
    app.stage.addChild(dashBoard, currentScore, HighScore, Hscore, Attemps, slipperContainer, pointer, score);

    //-------------------------------------------

    //------------------------------------------
    var mouseTracking = function mouseTracking() {
      document.onmousemove = handleMouseMove;
      function handleMouseMove(event) {
        var dot = void 0,
            eventDoc = void 0,
            doc = void 0,
            body = void 0,
            pageX = void 0,
            pageY = void 0;
        event = event || window.event; // IE-ism

        if (event.pageX == null && event.clientX != null) {
          eventDoc = event.target && event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;

          event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }

        app.ticker.add(function (delta) {
          tom.position.x = event.pageX;
          pointer.position.x = event.pageX;
        });
      }
    };

    mouseTracking();
  };
});