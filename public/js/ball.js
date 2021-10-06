var ball = {

    // reference to app.
    app: null,

    // reference to helping variables.
    stats: null,
    angle: null,

    // reference to players.
    playerOne: null,
    playerTwo: null,

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
            speed: 4,
        };

        this.app.nodes.push(stats);

        return stats;
    },
    keepBallInBounds: function () {
        if (this.stats.y < 0) {
            this.stats.dirY = Math.tan(- this.angle) * this.stats.dirX;
        } else if (this.stats.y + this.stats.height > this.app.height) {
            this.stats.dirY = Math.tan(-this.angle) * this.stats.dirX;
        }
    },
    getBallCollision: function (player) {
        return (
            this.stats.x < player.x + player.width &&
            this.stats.x + this.stats.width > player.x &&
            this.stats.y < player.y + player.height &&
            this.stats.y + this.stats.height > player.y
        );
    },
    bounceBallOffRacket: function () {

        let hit = this.getBallCollision(this.playerOne);
        if (hit) {
            this.stats.dirY = Math.tan(this.angle) * this.stats.dirX;
            this.stats.dirX = - this.stats.dirX;
            return;
        }

        hit = this.getBallCollision(this.playerTwo);
        if (hit) {
            this.stats.dirY = Math.tan(this.angle) * this.stats.dirX;
            this.stats.dirX = - this.stats.dirX;
        }
    },
    setAngle: function () {
        this.angle = Math.atan(this.stats.dirY / this.stats.dirX);
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