import React, { useContext } from "react";
import EditorContext from "../../context/editor/editorContext";

//import Worker from "workerize-loader!../../compiler/processor"; // eslint-disable-line import/no-webpack-loader-syntax

//let workerInstance = null;

import processor from "../../compiler/processor";

const RunButton = () => {
	const { code } = useContext(EditorContext);

	return (
		<button
			onClick={() => {
				/*
				if (workerInstance !== null) workerInstance.terminate();
				workerInstance = new Worker();
				workerInstance.addEventListener("message", (message) => {
					switch (message.data.type) {
						case "DONE":
							workerInstance.terminate();
							break;
						case "RPC":
							break;
						default:
							console.log("UNKNOWN MESSAGE TYPE", message.data.type);
					}
				});
				workerInstance.runCode(code);
				*/
				processor.run(code);
			}}
			style={{
				position: "absolute",
				left: window.innerWidth * 0.5 + 10,
				top: 10,
				width: 100,
				height: 50
			}}
			className="btn btn-primary"
		>
			RUN
		</button>
	);
};

export default RunButton;
