import React from "react";

import processor from "../../compiler/processor";

const StopButton = () => {
	return (
		<button
			onClick={() => {
				processor.rst = true;
			}}
			style={{
				position: "absolute",
				left: window.innerWidth * 0.5 + 130,
				top: 10,
				width: 100,
				height: 50
			}}
			className="btn btn-primary"
		>
			STOP
		</button>
	);
};

export default StopButton;
