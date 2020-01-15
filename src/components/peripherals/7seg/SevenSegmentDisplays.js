import React from "react";
import SevenSeg from "./7seg";
import processor from "../../../compiler/processor";

const testF = () => {
	processor.run(
		`
			code
		mov 0x90, #${Math.floor(Math.random() * 255)}
		mov 0x91, #${Math.floor(Math.random() * 255)}
		mov 0x92, #${Math.floor(Math.random() * 255)}
		mov 0x93, #${Math.floor(Math.random() * 255)}
		`
	);
	setTimeout(testF, 100);
};

const SevenSegmentDisplays = () => {
	setTimeout(testF, 100);

	return (
		<div>
			<SevenSeg x={900} y={20} byte={processor.memory[144]} />
			<SevenSeg x={1050} y={20} byte={processor.memory[145]} />
			<SevenSeg x={1200} y={20} byte={processor.memory[146]} />
			<SevenSeg x={1350} y={20} byte={processor.memory[147]} />
		</div>
	);
};

export default SevenSegmentDisplays;
