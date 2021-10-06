var score = {

    app: null,

    stats: null,

    textArr: [],

    onInit: function (app, array) {
        this.app = app;

        this.stats = this.initialize(array);
    },
    updateText: function (i, msg) {

        if (this.textArr == null) { return; }
        if (this.textArr.length == 0) { return; }

        this.textArr[i].text = msg;
    },
    initialize: function (array) {
        for (let i = 0; i < array.length; i++) {
            let values = array[i];
            let stats = {
                id: values.id,
                text: values.msg,
                x: values.posX,
                y: values.posY,
            }

            this.textArr.push(stats);
            this.app.nodes.push(this.textArr[i]);
        }

        this.stats = this.textArr[0];
    }
}

export { score }