import React from "react";
import Draggable from "react-draggable";

import Column from "./Column";
import processor from "../../../compiler/processor";

const LedMatrix = () => {
	return (
		<Draggable>
			<div>
				<Column x={900} y={300} byte={processor.memory[148]} />
				<Column x={960} y={300} byte={processor.memory[149]} />
				<Column x={1020} y={300} byte={processor.memory[150]} />
				<Column x={1080} y={300} byte={processor.memory[151]} />
				<Column x={1140} y={300} byte={processor.memory[152]} />
			</div>
		</Draggable>
	);
};

export default LedMatrix;
