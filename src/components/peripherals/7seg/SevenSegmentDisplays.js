import React from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

import SevenSeg from "./7seg";
import processor from "../../../compiler/processor";

const SevenSegmentDisplays = (props) => {
	const { x, y } = props;
	const segWidth = 150;
	return (
		<Draggable>
			<div className="peripheral">
				<SevenSeg x={x} y={y} byte={processor.memory[144]} />
				<SevenSeg x={x + segWidth} y={y} byte={processor.memory[145]} />
				<SevenSeg x={x + 2 * segWidth} y={y} byte={processor.memory[146]} />
				<SevenSeg x={x + 3 * segWidth} y={y} byte={processor.memory[147]} />
			</div>
		</Draggable>
	);
};

SevenSegmentDisplays.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default SevenSegmentDisplays;
