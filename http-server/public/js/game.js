// The game properties object that currently only contains the screen dimensions
var gameProperties = {
    screenWidth: 400,
    screenHeight: 600,
    ballPositionInit_y: 550,
    cupPosition_y: 100,


    ballVelocity: 500,
};

var graphicAssets = {
    ballURL: 'assets/splashbrotrans.png',
    ballName: 'ball',

    redCupURL: 'assets/red-solo-cup.png',
    redCupName: 'redcup',
};


var mainState = function (game){
    this.ballSprite;
    this.cupSprite;
    this.cups;
    this.cursors;
    this.groundGroup;
};


mainState.prototype = {
    preload: function() {
        game.load.image(graphicAssets.ballName, graphicAssets.ballURL);
        game.load.image(graphicAssets.redCupName, graphicAssets.redCupURL);
        game.load.image('tile', 'assets/ground_tile.png');
        game.plugins.add(new Phaser.Plugin.Isometric(game));
        game.world.setBounds(0,0, 1000, 1000);
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.2, 0);

    },
    create: function (){
        this.initControl();
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        this.groundGroup = game.add.group();
        var floorTile;
        for (var xt = 1000; xt > -100; xt -= 35){
            for (var yt = 1000; yt > -100; yt -= 35){
                floorTile = game.add.isoSprite(xt, yt, 0, 'tile', 0, this.groundGroup);
                floorTile.anchor.set(0.5);
            }
        }
        this.initGraphics();
        this.cursors = game.input.keyboard.createCursorKeys();

    }, 
    update: function (){
        //moving the ball 
        var speed = 100;
        if (this.cursors.up.isDown){
            this.ball.body.velocity.y = -speed*2;
            this.ball.body.velocity.x = -speed*2;
            this.ball.body.velocity.z = 300;
        }
        game.physics.isoArcade.collide(this.cups, this.ballSprite);
        game.physics.isoArcade.collide(this.groundGroup, this.ballSprite);

    },
    initGraphics: function (){
        //adding the ball into the world
        this.ballSprite = game.add.group();
        var ball = game.add.isoSprite(600, 600, 0, graphicAssets.ballName, 0, this.ballSprite);
        ball.anchor.set(0.5);
        ball.scale.setTo(0.1, 0.1);
        game.physics.isoArcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(0.8,0.8, 0);
        ball.body.drag.set(50, 50, 0);
        ball.body.immovable = false;

        // creating cup group
        this.cups = game.add.group();
        game.physics.isoArcade.enable(this.cups);
        var cup = game.add.isoSprite(105, 65, 0, graphicAssets.redCupName, 0, this.cups);
        cup.scale.setTo(0.1, 0.1);
        cup.anchor.set(0.5, 0.5);
        var cup = game.add.isoSprite(65, 105, 0, graphicAssets.redCupName, 0, this.cups);
        cup.scale.setTo(0.1, 0.1);
        cup.anchor.set(0.5, 0.5);
        var cup = game.add.isoSprite(85, 85, 0, graphicAssets.redCupName, 0, this.cups);
        cup.scale.setTo(0.1, 0.1);
        cup.anchor.set(0.5, 0.5);
        var cup = game.add.isoSprite(92, 112, 0, graphicAssets.redCupName, 0, this.cups);
        cup.scale.setTo(0.1, 0.1);
        cup.anchor.set(0.5, 0.5);
        var cup = game.add.isoSprite(112, 92, 0, graphicAssets.redCupName, 0, this.cups);
        cup.scale.setTo(0.1, 0.1);
        cup.anchor.set(0.5, 0.5);
        var cup = game.add.isoSprite(120, 120, 0, graphicAssets.redCupName, 0, this.cups);
        cup.scale.setTo(0.1, 0.1);
        cup.anchor.set(0.5, 0.5);
    },

    initControl: function(){
        // this.cursors = game.input.keyboard.createCursorKeys();
        // this.game.input.keyboard.addKeyCapture([
        //     Phaser.Keyboard.LEFT,
        //     Phaser.Keyboard.RIGHT,
        //     Phaser.Keyboard.UP,
        //     Phaser.Keyboard.DOWN
        // ]);
    }
};

// Initialise the Phaser framework by creating an instance of a Phaser.Game object and assigning it to a local variable called 'game'.
// The first two arguments are the width and the height of the canvas element. In this case 640 x 480 pixels. You can resize this in the gameProperties object above.
// The third argument is the renderer that will be used. Phaser.AUTO is used to automatically detect whether to use the WebGL or Canvas renderer.
// The fourth argument is 'gameDiv', which is the id of the DOM element we used above in the index.html file where the canvas element is inserted.
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

// Here we declare and add a state to the game object.
// The first argument is the state name that will is used to switch between states
// The second argument is the object name that will used when a state name is called
game.state.add('main', mainState);

// We are using the 'main' state name as the argument to load our new state.
game.state.start('main');