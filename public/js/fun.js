
var fun = {

    app: null,

    powerUp: null,

    ball: null,

    onInit: function (app, ball) {

        this.app = app;
        this.powerUp = this.initialize();

        this.ball = ball;

        let delay = 5000;
        // Call a function that calls every 10 seconds
        setInterval(this.setRandomPosition.bind(this), delay);
    },
    initialize: function () {
        let power = {
            id: "powerUp",
            width: 12,
            height: 12,
            x: this.getRandomValueInRange(this.app.width, 0),
            y: this.getRandomValueInRange(this.app.height, 0),
            color: '#de12e5'
        }

        this.app.nodes.push(power);

        return power;
    },
    randomColor: function () {

        if (this.ball.pickedUp) { return; }

        let color = Math.floor(Math.random() * 16777215).toString(16);
        document.getElementById("canvas").style.backgroundColor = "#" + color;
    },
    getRandomValueInRange: function (max, min) {
        return Math.random() * (max - min) + min;
    },
    setRandomPosition: function () {

        let posX = this.getRandomValueInRange(this.app.width, 0);
        let posY = this.getRandomValueInRange(this.app.height, 0);

        this.powerUp.x = posX;
        this.powerUp.y = posY
    },
    onCollision: function () {
        let hit = this.ball.getBallCollision(this.powerUp);
        if (hit) {
            this.ball.pickedUp = true;
        }
    },
    onUpdate: function () {

        if (this.ball == null) { return; }

        this.onCollision();
    }
}

export { fun }