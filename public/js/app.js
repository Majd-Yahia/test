var app = {
	//initial variables
	canvas: null,
	context: null,

	//resizing
	width: 800,
	height: 400,

	//nodes
	nodes: [],

	//timing
	timestamp: 0,
	now: 0,
	lastUpdate: 0,

	init: function () {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.render();
		this.onInit();
	},
	render: function () {
		this.clear();
		this.update();

		window.requestAnimationFrame(this.render.bind(this));
	},
	clear: function () {
		this.context.clearRect(0, 0, this.width, this.height);
	},
	update: function () {
		var dt = Date.now() - this.lastUpdate;

		this.onUpdate(dt);

		for (var index in this.nodes) {
			var node = this.nodes[index];
			if (node.id === 'score') {
				this.drawText(node);
			} else if (node.id === 'ball') {
				this.context.fillStyle = node.color;
				this.context.beginPath();
				this.context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
				this.context.fill();
			}
			else {
				this.context.fillStyle = node.color;
				this.context.fillRect(node.x, node.y, node.width, node.height);
			}
		}

		this.lastUpdate = Date.now();
		this.timestamp += dt;
	},
	getNode: function (id) {
		for (var index in this.nodes) {
			var node = this.nodes[index];
			if (node.id == id) {
				return node;
			}
		}
		return { x: null, y: null, width: null, height: null };
	},
	drawText: function (node) {
		this.context.font = "30px Arial";
		this.context.fillText(node.text, node.x, node.y);
	}, reset: function () {
		gameState = this.getNode('state');
		if (gameState == undefined) { return; }

		this.getNode('racketOne').score = 0;
		this.getNode('racketTwo').score = 0;

		gameState.paused = false;
		gameState.end = false;

		this.getNode('score').x = this.getNode('score').x;
		this.getNode('score').text = '0 - 0';
	},
	pause: function () {
		var state = this.getNode('state');
		if (state == undefined) { return; }

		if (state.end) {
			app.reset();
		} else {
			state.paused = !state.paused;
		}
	},

	//events
	onInit: function () { },
	onUpdate: function () { }
};

window.onload = function () {
	app.init();
};