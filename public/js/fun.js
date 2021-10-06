
var fun = {
    randomColor: function () {
        let color = Math.floor(Math.random() * 16777215).toString(16);
        document.getElementById("canvas").style.backgroundColor = "#" + color;
    }
}

export { fun }