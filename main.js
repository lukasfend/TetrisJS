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
let currentButtons = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false,
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false
};

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

		// Draw current keys
		r.renderKeys(GameState, currentButtons);

		const _ref = this;
		window.requestAnimationFrame( () => {
			_ref.frame();
		});

	},

	handleCollisions(dx, dy, rotate = false) {
		let requireNewShape = false;
		let didCollideBottom = false;
		let didCollideWithWalls = false;
		let didFaultyRotation = false;

		// Check for collisions on the bottom
		const possibleCollisionTiles = p.currentShape.getActiveTiles();

		for(let coll of possibleCollisionTiles) {
			// check bottom collision
			if(coll.y + dy === GameConfig.fieldsY) {
				didCollideBottom = true;
			}

			// check side collision
			if((coll.x + dx) < 0) {
				didCollideWithWalls = true;
			} else if((coll.x + dx) >= GameConfig.fieldsX) {
				didCollideWithWalls = true;
			}
		
		}

		if(!didCollideBottom) {
			p.y+=dy;
		} else {
			for(let coll of possibleCollisionTiles) {
				tiles[coll.x][coll.y].setActive(true);
				tiles[coll.x][coll.y].setColor(coll.color);
				requireNewShape = true;
			}
		}

		if(!didCollideWithWalls) {
			p.x += dx;
		}

		if(!didFaultyRotation && rotate) {
			p.currentShape.rotate();
		}


		if(requireNewShape) {
			p.x = parseInt(GameConfig.fieldsX / 2);
			p.y = 0;
			p.currentShape = GameState.nextShape;
			p.currentShape.player = p;
			GameState.nextShape = Shape.generateNewShape(virtualPlayer);
		}
	},

	tick() {
		Game.handleCollisions(0,1);
		GameState.time += (Date.now() - GameState.deltaTime);
		GameState.deltaTime = Date.now();
	},

	keyPress(e) {
		document.getElementById("bgmusic").play();
		inputbuffer += e.key;
		if(inputbuffer.includes("RICKROLL")) {
			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		}
		
		switch(e.code) {
			case "KeyA":
			case "ArrowLeft":
				this.handleCollisions(-1, 0, false);
				break;
			case "KeyD":
			case "ArrowRight":
				this.handleCollisions(1, 0, false);
				break;
			case "KeyS":
			case "ArrowDown":
				this.handleCollisions(0,1,false);
				break;
			case "KeyW":
			case "ArrowUp":
				this.handleCollisions(0,0, true);
				break;
			case "Space":
				// go all the way down
				break;
			case "Escape":
				if(!GameState.paused) {
					document.getElementById("bgmusic").pause();
					GameState.paused = true;
					clearInterval(GameState.interVal);
				} else {
					document.getElementById("bgmusic").play();
					GameState.paused = false;
					GameState.deltaTime = Date.now();
					GameState.interVal = setInterval(this.tick, GameConfig.tickRate);
				}
				break;
		}
	}

};

window.onkeydown = e => {
	if(currentButtons[e.code] !== null) {
		currentButtons[e.code] = true;
	}
	Game.keyPress(e);
}
window.onkeyup = e => {
	if(currentButtons[e.code] !== null) {
		currentButtons[e.code] = false;
	}
}


// Initialize Game
Game.init();