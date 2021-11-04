class RenderEngine {

	constructor(canvas, GameConfig) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.GameConfig = GameConfig;

		this.gameField = {
			unit: 0,
			startX: 0,
			startY: 0,
			width: 0,
			height: 0
		};
	}

	fitToScreen() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.gameField.height = this.canvas.height - 2 * this.GameConfig.fieldPadding;
		this.gameField.unit = this.gameField.height / this.GameConfig.fieldsY;
		this.gameField.width = this.gameField.unit * this.GameConfig.fieldsX;
		this.gameField.startX = parseInt((window.innerWidth / 2) - this.gameField.width/2);
		this.gameField.startY = this.GameConfig.fieldPadding;
	}

	setBgColor(bgColor = "#000000") {
		this.canvas.style.backgroundColor = bgColor;
	}

	getCtx() {
		return this.ctx;
	}

	getCanvas() {
		return this.canvas;
	}

	renderGrid() {
		this.ctx.strokeStyle = "rgba(255,255,255,0.1)";
		const x = this.gameField.startX;
		const y = this.gameField.startY;
		const u = this.gameField.unit;
		const h = this.gameField.height;
		const w = this.gameField.width;
		for(let i = 0; i < this.GameConfig.fieldsX; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(x + i * u, y);
			this.ctx.lineTo(x + i * u, y + h);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		for(let i = 0; i < this.GameConfig.fieldsY; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(x, y + i * u);
			this.ctx.lineTo(x + w, y + i * u);
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	renderPauseInfo() {
		this.ctx.fillStyle = "#ff0000";
		this.ctx.font = "40px Consolas";
		this.ctx.fillText("PAUSE", 100, 100);
	}

	// Drawing Methods
	clear() {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		// Draw GameBG
		this.ctx.rect(this.gameField.startX,this.gameField.startY,this.gameField.width,this.gameField.height);
		this.ctx.fillStyle = this.GameConfig.fieldBg;
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
		this.ctx.lineWidth = 2;
		this.ctx.moveTo(this.gameField.startX - 1, this.gameField.startY - 1);
		this.ctx.lineTo(this.gameField.startX - 1 + this.gameField.width + 1, this.gameField.startY - 1);
		this.ctx.lineTo(this.gameField.startX - 1 + this.gameField.width + 1, this.gameField.startY - 1 + this.gameField.height + 1);
		this.ctx.lineTo(this.gameField.startX - 1, this.gameField.startY - 1 + this.gameField.height + 1);
		this.ctx.lineTo(this.gameField.startX - 1, this.gameField.startY - 1);
		this.ctx.stroke();
		this.ctx.closePath();

	}

}