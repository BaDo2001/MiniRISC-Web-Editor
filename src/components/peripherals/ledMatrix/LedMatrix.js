import React, { useContext } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import LedMatrixContext from "../../../context/ledMatrix/ledMatrixContext";

import Column from "./Column";
import processor from "../../../compiler/processor";

const LedMatrix = (props) => {
	const { x, y } = props;
	const colWidth = 60;

	const { col0Canvas, col1Canvas, col2Canvas, col3Canvas, col4Canvas } = useContext(
		LedMatrixContext
	);

	return (
		<Draggable>
			<div style={{ zIndex: 2 }} className="peripheral">
				<Column x={x} y={y} byte={processor.memory[148]} canvas={col0Canvas} />
				<Column x={x + colWidth} y={y} byte={processor.memory[149]} canvas={col1Canvas} />
				<Column x={x + colWidth * 2} y={y} byte={processor.memory[150]} canvas={col2Canvas} />
				<Column x={x + colWidth * 3} y={y} byte={processor.memory[151]} canvas={col3Canvas} />
				<Column x={x + colWidth * 4} y={y} byte={processor.memory[152]} canvas={col4Canvas} />
			</div>
		</Draggable>
	);
};

LedMatrix.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default LedMatrix;
