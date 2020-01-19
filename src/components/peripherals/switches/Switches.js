import React from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

import SW from "./SW";
import processor from "../../../compiler/processor";

const Switches = (props) => {
	const { x, y } = props;
	const switchWidth = 50;
	return (
		<Draggable>
			<div
				style={{
					border: "1px solid black",
					position: "relative",
					left: x,
					top: y,
					width: switchWidth * 8,
					height: 100,
					backgroundColor: "transparent",
					zIndex: 0
				}}
			>
				<SW x={6} y={30} text={"SW7"} byte={processor.memory[129]} byteIndex={7} />
				<SW
					x={6 + switchWidth}
					y={30}
					text={"SW6"}
					byte={processor.memory[129]}
					byteIndex={6}
				/>
				<SW
					x={6 + switchWidth * 2}
					y={30}
					text={"SW5"}
					byte={processor.memory[129]}
					byteIndex={5}
				/>
				<SW
					x={6 + switchWidth * 3}
					y={30}
					text={"SW4"}
					byte={processor.memory[129]}
					byteIndex={4}
				/>
				<SW
					x={6 + switchWidth * 4}
					y={30}
					text={"SW3"}
					byte={processor.memory[129]}
					byteIndex={3}
				/>
				<SW
					x={6 + switchWidth * 5}
					y={30}
					text={"SW2"}
					byte={processor.memory[129]}
					byteIndex={2}
				/>
				<SW
					x={6 + switchWidth * 6}
					y={30}
					text={"SW1"}
					byte={processor.memory[129]}
					byteIndex={1}
				/>
				<SW
					x={6 + switchWidth * 7}
					y={30}
					text={"SW0"}
					byte={processor.memory[129]}
					byteIndex={0}
				/>
			</div>
		</Draggable>
	);
};

Switches.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default Switches;
