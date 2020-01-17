import React from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

import Column from "./Column";
import processor from "../../../compiler/processor";

const LedMatrix = (props) => {
	const { x, y } = props;
	const colWidth = 60;
	return (
		<Draggable>
			<div style={{ zIndex: 2 }} className="peripheral">
				<Column x={x} y={y} byte={processor.memory[148]} />
				<Column x={x + colWidth} y={y} byte={processor.memory[149]} />
				<Column x={x + colWidth * 2} y={y} byte={processor.memory[150]} />
				<Column x={x + colWidth * 3} y={y} byte={processor.memory[151]} />
				<Column x={x + colWidth * 4} y={y} byte={processor.memory[152]} />
			</div>
		</Draggable>
	);
};

LedMatrix.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default LedMatrix;
