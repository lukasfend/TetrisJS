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
		this.ctx.strokeStyle = "rgba(255,255,255,0.05)";
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
		const modal = {
			x: this.gameField.startX + parseInt(this.gameField.width / 2) - 150,
			y: this.gameField.startY + parseInt(this.gameField.height / 2) - 75,
			width: 300,
			height: 150
		};
		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "#FFFFFF";

		this.ctx.beginPath();
		this.ctx.lineWidth = 8;
		this.ctx.lineCap = "rounded";
		this.ctx.moveTo(modal.x,modal.y);
		this.ctx.lineTo(modal.x + modal.width, modal.y);
		this.ctx.lineTo(modal.x + modal.width, modal.y + modal.height);
		this.ctx.lineTo(modal.x, modal.y + modal.height);
		this.ctx.lineTo(modal.x, modal.y);
		this.ctx.lineTo(modal.x+1, modal.y);
		this.ctx.stroke();
		this.ctx.fillRect(modal.x,modal.y,modal.width,modal.height);

		this.ctx.fillStyle = "#7700ff";
		this.ctx.textAlign = "center";
		this.ctx.font = "90px ArcadeClassic";
		this.ctx.fillText("PAUSE", modal.x + modal.width/2, modal.y + modal.height/2+30);
	}
	renderScore(GameState) {
		// Lines
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.textAlign = "left";
		this.ctx.font = "22px ArcadeClassic";
		this.ctx.fillText("LINES", this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY + 265);
		
		this.ctx.font = "40px ArcadeClassic";
		this.ctx.fillText("00000", this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY + 300);

		// Level
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.textAlign = "right";
		this.ctx.font = "22px ArcadeClassic";
		this.ctx.fillText("LEVEL", this.gameField.startX + this.gameField.width + 350, this.gameField.startY + 265);
		this.ctx.font = "40px ArcadeClassic";
		this.ctx.fillText("000", this.gameField.startX + this.gameField.width + 350, this.gameField.startY + 300);

		// Score
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.textAlign = "left";
		this.ctx.font = "30px ArcadeClassic";
		this.ctx.fillText("SCORE", this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY + 355);
		this.ctx.font = "48px ArcadeClassic";
		this.ctx.fillText("00000", this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY + 395);

		// Time
		this.ctx.fillStyle = "#CACACA";
		this.ctx.textAlign = "right";
		this.ctx.font = "22px ArcadeClassic";
		this.ctx.fillText("TIME", this.gameField.startX + this.gameField.width + 350, this.gameField.startY + 355);
		this.ctx.font = "40px ArcadeClassic";
		let time = parseInt(GameState.time / 1000);
		let mins = parseInt(time / 60);
		let secs = time % 60;
		secs = (secs < 10) ? "0" + secs : secs;
		mins = (mins < 10) ? "0" + mins : mins;
		this.ctx.fillText(mins + ":" + secs, this.gameField.startX + this.gameField.width + 350, this.gameField.startY + 395);

		// Copynote
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.textAlign = "center";
		this.ctx.font = "18px ArcadeClassic";
		this.ctx.fillText("© Lukas 'Dragoran' Fend", this.gameField.startX + this.gameField.width/2, this.gameField.startY + this.gameField.height+25);
	}

	renderPreview(GameState) {
		this.ctx.strokeStyle = "#e0e0e0";
		this.ctx.fillStyle = "#090909";
		this.ctx.beginPath();
		this.ctx.moveTo(this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY);
		this.ctx.lineTo(this.gameField.startX + this.gameField.width + this.gameField.unit + 300, this.gameField.startY);
		this.ctx.lineTo(this.gameField.startX + this.gameField.width + this.gameField.unit + 300, this.gameField.startY + 6 * this.gameField.unit);
		this.ctx.lineTo(this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY + 6 * this.gameField.unit);
		this.ctx.lineTo(this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.fillStyle = "#22ff22";
		this.ctx.textAlign = "left";
		this.ctx.font = "30px ArcadeClassic";
		this.ctx.fillText("NEXT UP", this.gameField.startX + this.gameField.width + this.gameField.unit, this.gameField.startY -5	);
		this.ctx.closePath();
		for(let t of GameState.nextShape.getActiveTiles()) {
			t.autoRender(this.gameField,this.getCtx());
		}
		GameState.nextShape;

	}

	renderKeys(GameState, currentButtons) {
		this.renderKey(
			this.gameField.startX + this.gameField.width + this.gameField.unit*4,
			this.gameField.startY+17*this.gameField.unit,
			"W", 
			currentButtons.KeyW || currentButtons.ArrowUp
		);
		this.renderKey(
			this.gameField.startX + this.gameField.width + this.gameField.unit,
			this.gameField.startY+20*this.gameField.unit,
			"A", 
			currentButtons.KeyA || currentButtons.ArrowLeft
		);
		this.renderKey(
			this.gameField.startX + this.gameField.width + this.gameField.unit*4,
			this.gameField.startY+20*this.gameField.unit,
			"S", 
			currentButtons.KeyS || currentButtons.ArrowDown
		);
		this.renderKey(
			this.gameField.startX + this.gameField.width + this.gameField.unit*7,
			this.gameField.startY+20*this.gameField.unit,
			"D", 
			currentButtons.KeyD || currentButtons.ArrowRight
		);
	}

	renderKey(x,y,key = "?", active = false) {
		this.ctx.beginPath();
		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = active ? "#00ff40" : "#FFFFFF";
		this.ctx.rect(x,y,this.gameField.unit*2, this.gameField.unit*2);
		this.ctx.stroke();
		this.ctx.fillStyle = active ? "#00ff40" : "#FFFFFF";
		this.ctx.textAlign = "center";
		this.ctx.font = "35px ArcadeClassic";
		this.ctx.fillText(key, x+this.gameField.unit, y+45);
		this.ctx.closePath();
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