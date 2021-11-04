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
	deltaTime: 0,
	interVal: null,
	paused: false,
	score: 0,
	lines: 0,
	nextShape: null
};

let inputbuffer = "";

const r = new RenderEngine(document.getElementById("canvas"), GameConfig);

let p = new Player(parseInt(GameConfig.fieldsX/2),0);
let virtualPlayer = new Player(GameConfig.fieldsX + 4,1);
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

		GameState.deltaTime = Date.now();
		GameState.interVal = setInterval(this.tick, GameConfig.tickRate);
		GameState.nextShape = Shape.generateNewShape(virtualPlayer);
		this.frame();
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
		r.renderScore(GameState);
		r.renderPreview(GameState);

		const _ref = this;
		window.requestAnimationFrame( () => {
			_ref.frame();
		});

	},

	tick() {
		let requireNewShape = false;

		// Check for collisions on the borders
		const possibleCollisionTiles = p.currentShape.getActiveTiles();
		let didCollideBottom = false;
		for(let coll of possibleCollisionTiles) {
			if(coll.y + 1 === GameConfig.fieldsY) {
				didCollideBottom = true;
			}
		}

		if(!didCollideBottom) {
			p.y++;
		} else {
			for(let coll of possibleCollisionTiles) {
				tiles[coll.x][coll.y].setActive(true);
				tiles[coll.x][coll.y].setColor(coll.color);
				requireNewShape = true;
			}
		}

		if(requireNewShape) {
			p.x = parseInt(GameConfig.fieldsX / 2);
			p.y = 0;
			p.currentShape = GameState.nextShape;
			p.currentShape.player = p;
			GameState.nextShape = Shape.generateNewShape(virtualPlayer);
		}

		GameState.time += (Date.now() - GameState.deltaTime);
		GameState.deltaTime = Date.now();
	},

	keyPress(e) {
		inputbuffer += e.key;
		if(inputbuffer.includes("RICKROLL")) {
			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		}
		
		switch(e.code) {
			case "KeyA":
			case "ArrowLeft":
				if(p.currentShape.type === ShapeType.LINE) {

				} else {

				}
				p.x--;
				break;
			case "KeyD":
			case "ArrowRight":
				p.x++;
				break;
			case "KeyS":
			case "ArrowDown":
				this.tick();
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
					GameState.deltaTime = Date.now();
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