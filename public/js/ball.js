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
        if (this.getBallCollision(this.playerOne)) {
            this.stats.dirY = Math.tan(this.angle) * this.stats.dirX;
            this.stats.dirX = - this.stats.dirX;
        } else if (this.getBallCollision(this.playerTwo)) {
            this.stats.dirY = Math.tan(this.angle) * this.stats.dirX;
            this.stats.dirX = - this.stats.dirX;
        }
    },
    setAngle: function () {
        this.angle = Math.atan(this.stats.dirY / this.stats.dirX);
    },
    moveBall: function () {
        this.stats.x += this.stats.dirX * this.stats.speed;
        this.stats.y += this.stats.dirY * this.stats.speed;
    },
    onUpdate: function () {
        if (this.app == null || this.stats == null) { return; }

        this.setAngle();
        this.keepBallInBounds();
        this.moveBall();
        this.bounceBallOffRacket();
    },
}

export { ball }