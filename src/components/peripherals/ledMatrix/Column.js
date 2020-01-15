import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Byte } from "../../../compiler/byte";

function drawLed(ctx, x, y, fillStyle) {
	ctx.beginPath();
	ctx.fillStyle = fillStyle;
	ctx.arc(x, y, 10, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
}

const Column = (props) => {
	const { x, y, byte } = props;
	const ledCanvas = useRef(null);
	const width = 60;
	const height = 420;

	const show = (ctx, data) => {
		for (let row = 6; row >= 0; row--) {
			let colour = data[row] === "1" ? "red" : "#333";
			drawLed(ctx, 30, (6 - row) * 60 + 30, colour);
		}
	};

	byte.onChange = () => {
		const ctx = ledCanvas.current.getContext("2d");
		show(ctx, byte.toBinary());
	};

	return (
		<canvas
			ref={ledCanvas}
			width={width}
			height={height}
			style={{
				position: "absolute",
				left: `${x}px`,
				backgroundColor: "#333",
				top: `${y}px`,
				zIndex: 0
			}}
		/>
	);
};

Column.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	byte: PropTypes.instanceOf(Byte)
};

export default Column;