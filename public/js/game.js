import { player } from "./player.js";
import { ball } from "./ball.js";
import { score } from "./score.js";
import { fun } from './fun.js';

var game = {

    stats: null,

    app: null,

    score: null,

    ball: null,

    playerOne: null,
    playerTwo: null,

    onInit: function (app) {

        this.app = app;

        // Initialize each module.
        player.onInit(this.app);
        ball.onInit(this.app, player.playerOne, player.playerTwo);
        score.onInit(this.app, [
            {
                id: "scoreText",
                msg: "0 - 0",
                posX: 10,
                posY: app.height - 20,
            },
            {
                id: "winText",
                msg: "",
                posX: 200,
                posY: 70,
            },
            {
                id: "infoText",
                msg: "Press space to pause/unpause",
                posX: 200,
                posY: 30,
            },
        ]);

        fun.onInit(app, ball);

        // Setting up the values in game moduel.
        this.score = score;
        this.ball = ball;

        this.playerOne = ball.playerOne;
        this.playerTwo = ball.playerTwo;

        this.stats = this.initialize();
    },
    initialize: function () {

        let stats = {
            id: "state",
            defaultBallSpeed: 3,
            playerOneScore: 0,
            playerTwoScore: 0,
            maxScore: 3,
            paused: true,
            end: false,
        }

        this.app.nodes.push(stats);

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

            if (player.id.includes("One")) {
                this.score.updateText(1, "Player One has won the game!");
            } else {
                this.score.updateText(1, "Player Two has won the game!");
            }

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
    setPauseGame: function () {
        this.stats.paused = true;
    },
    updateStateOnHit: function () {
        let hit = this.getBallHit();
        switch (hit) {
            case 1:
                this.ball.resetBall();
                this.updateScore(this.playerOne);
                this.updateScoreText();
                this.setPauseGame();
                break;
            case 2:
                this.ball.resetBall();
                this.updateScore(this.playerTwo);
                this.updateScoreText();
                this.setPauseGame();
                break;
            default:
                break;
        }
    },
    onUpdate: function () {
        if (this.ball == null) { return; }
        if (this.playerOne == null || this.playerTwo == null) { return; }

        player.onUpdate(this.stats);
        ball.onUpdate(this.stats);
        fun.onUpdate();

        this.updateStateOnHit();
    }
}

export { game }