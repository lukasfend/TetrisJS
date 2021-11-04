class Player {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.currentShape = null;
	}
}

class Shape {
	constructor(type = "0", player) {
		this.type = type;
		this.player = player;
		this.shape = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		this.color = "#00ff00";
	}

	getActiveTiles() {
		let activeTiles = [];
		for(let x = 0; x < this.shape.length; x++) {
			for(let y = 0; y < this.shape.length; y++) {
				if(this.shape[x][y] !== 0) {
					activeTiles = [...activeTiles, new Tile(this.player.x + x, this.player.y + y)];
				}
			}
		}
		for(let t of activeTiles) {
			t.setColor(this.color);
			t.setActive(true);
		}
		return activeTiles;
	}

	rotate() {
		this.rotateRight();
	}

	rotateLeft() {
		this.shape = this.shape.map((val, index) => this.shape.map(row => row[index]).reverse());
		return;
	}
	rotateRight() {
		this.rotateLeft();
		this.rotateLeft();
		this.rotateLeft();
	}
}

const ShapeType = {
	BLOCK: "BLOCK",
	LINE: "LINE",
	T: "T",
	L: "L",
	ANTI_L: "ANTI_L",
	Z: "Z",
	ANTI_Z: "ANTI_Z"
}

function generateShape(type, player) {
	switch(type) {
		case "LINE":
			const LineShape = new Shape("LINE",player);
			LineShape.color = "#0dd7ff";
			LineShape.shape = [ 
				[0,0,0,0],
				[1,1,1,1],
				[0,0,0,0],
				[0,0,0,0]
			];
			return LineShape;
		case "BLOCK":
			const BlockShape = new Shape("BLOCK",player);
			BlockShape.color = "#f2fa02";
			BlockShape.shape = [ 	
				[0,0,0,0],
				[0,1,1,0],
				[0,1,1,0],
				[0,0,0,0]
			];
			return BlockShape;
		case "T":
			const TShape = new Shape("T", player)
			TShape.color = "#7302eb";
			TShape.shape = [
				[0,1,0],
				[0,1,1],
				[0,1,0]
			];
			return TShape;
		case "L":
			const LShape = new Shape("L", player);
			LShape.color = "#cc6f04";
			LShape.shape = [
				[0,1,0],
				[0,1,0],
				[0,1,1]
			];
			return LShape;
		case "ANTI_L":
			const AntiLShape = new Shape("ANTI_L", player);
			AntiLShape.color = "#0370ff";
			AntiLShape.shape = [
				[0,1,0],
				[0,1,0],
				[1,1,0]
			];
			return AntiLShape;
		case "Z":
			const ZShape = new Shape("Z", player);
			ZShape.color = "#cf0000";
			ZShape.shape = [
				[1,1,0],
				[0,1,1],
				[0,0,0]
			];
			return ZShape;
		case "ANTI_Z":
			const AntiZ = new Shape("ANTI_Z", player);
			AntiZ.color = "#02c408";
			AntiZ.shape = [
				[0,1,1],
				[1,1,0],
				[0,0,0]
			];
			return AntiZ;
	}
}