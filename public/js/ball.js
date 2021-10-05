var ball = {

    // reference to app.
    app: null,

    // reference to helping variables.
    ball: null,
    angle: null,

    // reference to players.
    playerOne: null,
    playerTwo: null,

    onInit: function (app, playerOne, playerTwo) {
        this.app = app;

        // initialize ball.
        this.ball = this.initialize();

        // initialize players.
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;

    },
    initialize: function () {
        let ball = {
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

        this.app.nodes.push(ball);

        return ball;
    },
    keepBallInBounds: function () {
        if (this.ball.y < 0) {
            this.ball.dirY = Math.tan(- this.angle) * this.ball.dirX;
        } else if (this.ball.y + this.ball.height > this.app.height) {
            this.ball.dirY = Math.tan(-this.angle) * this.ball.dirX;
        }
    },
    getBallCollision: function (player) {
        return (
            this.ball.x < player.x + player.width &&
            this.ball.x + this.ball.width > player.x &&
            this.ball.y < player.y + player.height &&
            this.ball.y + this.ball.height > player.y
        );
    },
    bounceBallOffRacket: function () {
        if (this.getBallCollision(playerOne)) {
            this.ball.dirY = Math.tan(this.angle) * this.ball.dirX;
            this.ball.dirX = - this.ball.dirX;
        } else if (this.getBallCollision(playerTwo)) {
            this.ball.dirY = Math.tan(this.angle) * this.ball.dirX;
            this.ball.dirX = - this.ball.dirX;
        }
    },
    setAngle: function () {
        this.angle = Math.atan(this.ball.dirY / this.ball.dirX);
    },
    moveBall: function () {
        this.ball.x += this.ball.dirX * this.ball.speed;
        this.ball.y += this.ball.dirY * this.ball.speed;
    },
    onUpdate: function () {
        if (this.app == null || this.ball == null) { return; }

        this.setAngle();
        this.keepBallInBounds();
        this.moveBall();
    },
}

export { ball }