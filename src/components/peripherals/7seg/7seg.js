import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Byte } from "../../../compiler/byte";

class Seg {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

class HorizontalSeg extends Seg {
	constructor(x, y) {
		super(x, y, 80, 20);
	}

	show(ctx, fillStyle) {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + this.height * 0.5);
		ctx.lineTo(this.x + 10, this.y + this.height);
		ctx.lineTo(this.x + this.width - 10, this.y + this.height);
		ctx.lineTo(this.x + this.width, this.y + this.height * 0.5);
		ctx.lineTo(this.x + this.width - 10, this.y);
		ctx.lineTo(this.x + 10, this.y);
		ctx.lineTo(this.x, this.y + this.height * 0.5);
		ctx.closePath();
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}
}

class VerticalSeg extends Seg {
	constructor(x, y) {
		super(x, y, 20, 80);
	}

	show(ctx, fillStyle) {
		ctx.beginPath();
		ctx.moveTo(this.x + this.width * 0.5, this.y);
		ctx.lineTo(this.x, this.y + 10);
		ctx.lineTo(this.x, this.y + this.height - 10);
		ctx.lineTo(this.x + this.width * 0.5, this.y + this.height);
		ctx.lineTo(this.x + this.width, this.y + this.height - 10);
		ctx.lineTo(this.x + this.width, this.y + 10);
		ctx.lineTo(this.x + this.width * 0.5, this.y);
		ctx.closePath();
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}
}

class DecimalPoint extends Seg {
	constructor(x, y) {
		let r = 5;
		super(x - r, y - r, 2 * r, 2 * r);
		this.x = x;
		this.y = y;
		this.r = r;
	}

	show(ctx, fillStyle) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}
}

const SevenSeg = (props) => {
	const { x, y, byte } = props;
	const segs = [
		new HorizontalSeg(10, 0),
		new VerticalSeg(80, 10),
		new VerticalSeg(80, 90),
		new HorizontalSeg(10, 160),
		new VerticalSeg(0, 90),
		new VerticalSeg(0, 10),
		new HorizontalSeg(10, 80),
		new DecimalPoint(140, 170)
	];
	const sevenSegCanvas = useRef(null);

	const show = (ctx, data) => {
		for (let i = 7; i >= 0; i--) {
			if (data[i] === "1") segs[i].show(ctx, "red");
			else segs[i].show(ctx, "#333");
		}
	};

	byte.onChange = () => {
		const ctx = sevenSegCanvas.current.getContext("2d");
		show(ctx, byte.toBinary());
	};

	return (
		<canvas
			ref={sevenSegCanvas}
			width={150}
			height={180}
			style={{
				position: "absolute",
				left: `${x}px`,
				top: `${y}px`,
				backgroundColor: "#333"
			}}
		/>
	);
};

SevenSeg.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	byte: PropTypes.instanceOf(Byte)
};

export default SevenSeg;
