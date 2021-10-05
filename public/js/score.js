var score = {

    app: null,

    stats: null,

    textArr: null,

    onInit: function (app, texts) {
        this.app = app;

        this.textArr = texts;

        this.stats = this.initialize();
    },
    initialize: function () {
        for (let i = 0; i < this.textArr.length; i++) {
            let values = this.textArr[i];
            let stats = {
                id: values.id,
                text: values.msg,
                x: values.posX,
                y: values.posY,
            }
            this.app.nodes.push(stats);
        }

        this.stats = this.textArr[0];
    },

}

export { score }