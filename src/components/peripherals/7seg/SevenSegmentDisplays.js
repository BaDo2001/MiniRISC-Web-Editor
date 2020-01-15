import React from "react";
import Draggable from "react-draggable";

import SevenSeg from "./7seg";
import processor from "../../../compiler/processor";

const SevenSegmentDisplays = () => {
	return (
		<Draggable>
			<div>
				<SevenSeg x={900} y={20} byte={processor.memory[144]} />
				<SevenSeg x={1050} y={20} byte={processor.memory[145]} />
				<SevenSeg x={1200} y={20} byte={processor.memory[146]} />
				<SevenSeg x={1350} y={20} byte={processor.memory[147]} />
			</div>
		</Draggable>
	);
};

export default SevenSegmentDisplays;
