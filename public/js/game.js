var game = {

    status: null,

    app: null,

    ball: null,

    playerOne: null,
    playerTwo: null,

    onInit: function (app, ball) {

        this.app = app;

        this.ball = ball;

        this.playerOne = ball.playerOne;
        this.playerTwo = ball.playerTwo;

        this.status = this.initialize();
    },
    initialize: function () {

        let status = {
            defaultBallSpeed: 3,
            playerOneScore: 0,
            playerTwoScore: 0,
            maxScore: 3,
            paused: true,
            end: false,
        }

        return status;
    },
    getBallHit: function () {
        // check if ball hit the net or not.
        if (this.ball.x + this.ball.width > this.app.width) {
            return 1;           // return 1 if player one scored.
        } else if (this.ball.x + this.ball.width < 0) {
            return 2;           // return 2 if player two scored.
        }
    },
    updateStateOnHit: function () {
        let hit = this.getBallHit();
        switch (hit) {
            case 1:
                console.log("Player one scored");
                break;
            case 2:
                console.log("Player two scored.");
                break;
            default:
                break;
        }
    },
    onUpdate: function () {
        this.updateStateOnHit();
    }
}

export { game }