const GameConfig = {
	bgColor: "#000000",
	fieldPadding: 100,
	fieldsX: 10,
	fieldsY: 22,
	fieldBg: "#141414",
	tickRate: 1000 / 2
};
let GameState = {
	time: 0,
	interVal: null,
	paused: false
};

let inputbuffer = "";

const r = new RenderEngine(document.getElementById("canvas"), GameConfig);

let p = new Player(parseInt(GameConfig.fieldsX/2),0);
let tiles = [];

const Game = {

	init() {
		p.currentShape = generateShape(ShapeType.ANTI_Z, p);

		r.fitToScreen();
		r.setBgColor();

		for(let x = 0; x < GameConfig.fieldsX; x++) {
			let newRow = [];
			for(let y = 0; y < GameConfig.fieldsY; y++) {
				newRow = [...newRow, new Tile(x,y)];
			}
			tiles = [...tiles, newRow];
		}

		this.frame();
		GameState.interVal = setInterval(this.tick, GameConfig.tickRate);
	},

	frame() {
		r.clear();
		r.renderGrid();
		
		// Draw saved tiles
		for(let row of tiles) {
			for(let t of row) {
				t.autoRender(r.gameField, r.getCtx());
			}
		}

		// Draw player
		for(let t of p.currentShape.getActiveTiles()) {
			t.autoRender(r.gameField, r.getCtx());
		}

		// Draw Pause Text
		if(GameState.paused) {
			r.renderPauseInfo();
		}

		const _ref = this;
		window.requestAnimationFrame( () => {
			_ref.frame();
		});

	},

	tick() {
		p.y++;
	},

	keyPress(e) {
		inputbuffer += e.key;
		console.log(e.key)
		if(inputbuffer.includes("RICKROLL")) {
			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		}
		
		switch(e.code) {
			case "KeyA":
			case "ArrowLeft":
				p.x--;
				break;
			case "KeyD":
			case "ArrowRight":
				p.x++;
				break;
			case "KeyS":
			case "ArrowDown":
				p.y++;
				break;
			case "KeyW":
			case "ArrowUp":
				p.currentShape.rotate();
				break;
			case "Space":
				// go all the way down
				break;
			case "Escape":
				if(!GameState.paused) {
					GameState.paused = true;
					clearInterval(GameState.interVal);
				} else {
					GameState.paused = false;
					GameState.interVal = setInterval(this.tick, GameConfig.tickRate);
				}
				break;
		}
	}

};

window.onkeydown = (e) => {
	Game.keyPress(e);
}


// Initialize Game
Game.init();