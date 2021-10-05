var game = {

    stats: null,

    app: null,

    score: null,

    ball: null,

    playerOne: null,
    playerTwo: null,

    onInit: function (app, ball, score) {

        this.app = app;

        this.ball = ball;

        this.score = score;

        this.playerOne = ball.playerOne;
        this.playerTwo = ball.playerTwo;

        this.stats = this.initialize();
    },
    initialize: function () {

        let stats = {
            defaultBallSpeed: 3,
            playerOneScore: 0,
            playerTwoScore: 0,
            maxScore: 3,
            paused: true,
            end: false,
        }

        return stats;
    },
    getBallHit: function () {
        let ball = this.ball.stats;

        // check if ball hit the net or not.
        if (ball.x + ball.width > this.app.width) {
            return 1;           // return 1 if player one scored.
        } else if (ball.x + ball.width < 0) {
            return 2;           // return 2 if player two scored.
        }
    },
    gameWon: function (player) {
        if (player.score >= this.stats.maxScore) {
            this.stats.end = true;
            console.log("Game Ended");
        }
    },
    updateScore: function (player) {
        player.score += 1;
        this.gameWon(player);
    },
    updateScoreText: function () {
        let score = this.playerOne.score + " - " + this.playerTwo.score;
        this.score.updateText(0, score);
    },
    updateStateOnHit: function () {
        let hit = this.getBallHit();
        switch (hit) {
            case 1:
                console.log("Player one scored");
                this.ball.resetBall();
                this.updateScore(this.playerOne);
                this.updateScoreText();
                break;
            case 2:
                console.log("Player two scored.");
                this.ball.resetBall();
                this.updateScore(this.playerTwo);
                this.updateScoreText();
                break;
            default:
                break;
        }
    },
    onUpdate: function () {
        if (this.ball == null) { return; }
        if (this.playerOne == null || this.playerTwo == null) { return; }

        this.updateStateOnHit();
    }
}

export { game }