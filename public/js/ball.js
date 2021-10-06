import { fun } from './fun.js';

var ball = {

    // reference to app.
    app: null,

    // reference to helping variables.
    stats: null,
    angle: null,

    // reference to players.
    playerOne: null,
    playerTwo: null,

    pickedUp: false,

    stop: false,
    hit: false,

    currentPlayer: null,
    speed: 0,

    bounceSound: '../resources/bounce.mp3',
    winSound: '../resources/win.mp3',
    pauseSound: '../resources/pause.mp3',

    onInit: function (app, playerOne, playerTwo) {
        this.app = app;

        // initialize ball.
        this.stats = this.initialize();

        // initialize players.
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;

    },
    initialize: function () {
        let stats = {
            id: "ball",
            x: app.width / 2,
            y: app.height / 2,
            width: 10,
            height: 10,
            radius: 5,
            color: "black",
            dirX: 1,
            dirY: -0.8,
            speed: 5,
        };

        this.app.nodes.push(stats);

        return stats;
    },
    playSound: function (sound) {

        if (this.stop) { return; }

        var audio = new Audio(sound);
        audio.play();
    },
    keepBallInBounds: function () {
        if (this.stats.y < 0) {
            this.stats.dirY = Math.tan(- this.angle) * this.stats.dirX;
            this.playSound(this.bounceSound);
        } else if (this.stats.y + this.stats.height > this.app.height) {
            this.stats.dirY = Math.tan(-this.angle) * this.stats.dirX;
            this.playSound(this.bounceSound);
        }
    },
    addSpeed: function () {
        this.stats.speed += 0.5;
        this.playerOne.speed += 0.1;
        this.playerTwo.speed += 0.1;
    },
    getBallCollision: function (obj) {
        return (
            this.stats.x < obj.x + obj.width &&
            this.stats.x + this.stats.width > obj.x &&
            this.stats.y < obj.y + obj.height &&
            this.stats.y + this.stats.height > obj.y
        );
    },
    updateBallLogic: function (player) {
        fun.randomColor();                              // change color of canvas.
        this.playSound(this.bounceSound);               // play sound.
        this.addSpeed();                                // speed up the ball.

        if (this.pickedUp) {
            this.currentPlayer = player;
        }

        this.hit = true;
    },
    bounceBallOffRacket: function () {
        let hit = this.getBallCollision(this.playerOne);
        if (hit) {
            this.stats.dirY = (this.stats.y - this.playerOne.y) / this.playerOne.height;
            this.stats.dirX = - this.stats.dirX;
            this.updateBallLogic(this.playerOne);
        }

        if (this.currentPlayer != null) {
            this.stickyBall(this.currentPlayer);
            return;
        }

        hit = this.getBallCollision(this.playerTwo);
        if (hit) {

            this.stats.dirY = (this.stats.y - this.playerTwo.y) / this.playerTwo.height;
            this.stats.dirX = - this.stats.dirX;
            this.updateBallLogic(this.playerTwo);                         // speed up the ball.
        }

        if (this.currentPlayer != null) {
            this.stickyBall(this.currentPlayer);
        }

    },
    setAngle: function () {
        this.angle = Math.atan(this.stats.dirY / this.stats.dirX);
    },
    stopBall: function () {
        this.stop = true;                       // Stop playing sounds.
        this.speed = this.stats.speed;          // save old speed.
        this.stats.speed = 0;                   // Set speed to 0.
    },
    stickyBall: function (player) {

        this.stats.y = player.y;            // move with player. 

        if (this.stop) { return; }
        this.stopBall();

        setTimeout(() => {
            this.releaseBall();
        }, 2000);
    },
    releaseBall: function () {

        this.stats.speed = this.speed;
        this.stop = false;

        this.currentPlayer = null;

        setTimeout(() => {
            this.pickedUp = false;
        }, 500);
    },
    resetBall: function () {
        this.stats.x = this.app.width / 2;
        this.stats.y = this.app.height / 2;

        // Get random integer in x direction.
        this.stats.dirX = this.getInteger(this.getRandomValueInRange(-1, 1));

        // Get random float value in y direction.
        this.stats.dirY = this.getRandomValueInRange(-1, 1);
    },
    getInteger: function (value) {
        let newValue = Math.floor(value)
        if (newValue == 0) { newValue = 1; }
        return newValue;
    },
    getRandomValueInRange: function (max, min) {
        return Math.random() * (max - min) + min;
    },
    moveBall: function () {
        this.stats.x += this.stats.dirX * this.stats.speed;
        this.stats.y += this.stats.dirY * this.stats.speed;
    },
    onUpdate: function (game) {

        if (game.end || game.paused) { return; }
        if (this.app == null || this.stats == null) { return; }

        this.setAngle();
        this.keepBallInBounds();
        this.moveBall();
        this.bounceBallOffRacket();
    },
}

export { ball }