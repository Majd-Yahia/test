var player = {

    // reference to app.
    app: null,

    // reference to players.
    playerOne: null,
    playerTwo: null,

    onInit: function (app) {

        this.app = app;

        // Keybind
        this.keyUp();
        this.keyDown();

        this.playerOne = this.playerInitialize("racketOne", 10, this.app.height / 2, 10, 50, "red");
        this.playerTwo = this.playerInitialize("racketTwo", this.app.width - 20, this.app.height / 2, 10, 50, "red");
    },
    playerInitialize: function (name, x, y, width, height, color) {

        let player = {
            id: name,
            x: x,
            y: y,
            width: width,
            height: height,
            color: color,
            direction: 0,
            speed: 4,
            score: 0,
        }

        this.app.nodes.push(player);

        return player;
    },
    keyUp: function () {
        document.addEventListener("keyup", function (e) {
            switch (e.which) {
                case 83:
                    app.getNode("racketOne").direction = 0;
                    break;
                case 87:
                    app.getNode("racketOne").direction = 0;
                    break;
                case 38:
                    app.getNode("racketTwo").direction = 0;
                    break;
                case 40:
                    app.getNode("racketTwo").direction = 0;
                    break;
                default:
                    break;
            }
        });
    },
    keyDown: function () {
        document.addEventListener("keydown", function (e) {
            // this returns the document so we need to save variables for access.
            switch (e.which) {
                case 83:
                    app.getNode("racketOne").direction = -1;
                    break;
                case 87:
                    app.getNode("racketOne").direction = 1;
                    break;
                case 38:
                    app.getNode("racketTwo").direction = 1;
                    break;
                case 40:
                    app.getNode("racketTwo").direction = -1;
                    break;
                case 32:
                    app.pause();
                    break;
                default:
                    break;
            }
        });
    },
    keepPlayerInBounds: function (player) {
        if (player.y < 0) {
            player.y = 0;
        } else if (player.y + player.height > app.height) {
            player.y = app.height - player.height;
        }
    },
    movePlayer: function () {
        this.playerOne.y -= this.playerOne.direction * this.playerOne.speed; // Move playerOne horizontally based on the direction * speed.
        this.playerTwo.y -= this.playerTwo.direction * this.playerTwo.speed; // Move playerRwo vertically based on the direction * speed.
    },
    onUpdate: function (game) {

        if (game.end || game.paused) { return; }

        // null safety
        if (this.app == null) { return; }
        if (this.playerOne == null || this.playerTwo == null) { return; }

        this.keepPlayerInBounds(this.playerOne);
        this.keepPlayerInBounds(this.playerTwo);
        this.movePlayer();
    },
}

export { player }