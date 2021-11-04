class Tile {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isActive = false;
		this.color = "#00ff00";
	}

	setColor(color = "#00ff00") {
		this.color = color;
	}
	setActive(active = false) {
		this.active = active;
	}

	autoRender(gameField, ctx = document.querySelector("canvas")) {
		if(!gameField) {
			throw new Error("GameField Data not passed, attempted render of Field failed.");
		}
		if(this.active) {
			const x = gameField.startX + this.x * gameField.unit;
			const y = gameField.startY + this.y * gameField.unit;
			const u = gameField.unit;
	
			// Render block self
			ctx.beginPath();
			ctx.strokeStyle = "rgba(0,0,0,0.4)";
			ctx.lineWidth = 2;
			// body
			ctx.fillStyle = this.color;
			ctx.fillRect(x, y, u, u);
			// border
	
			ctx.moveTo(x + 1, y + 1);
			ctx.lineTo(x + u - 1, y + 1);
			ctx.lineTo(x + u - 1, y + u - 1);
			ctx.lineTo(x + 1, y + u - 1);
			ctx.lineTo(x + 1, y + 1);
			ctx.stroke();
			ctx.closePath();
		}
	}
}