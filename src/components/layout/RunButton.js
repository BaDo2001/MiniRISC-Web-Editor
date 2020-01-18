import React, { useContext } from "react";
import EditorContext from "../../context/editor/editorContext";

import worker from "workerize-loader!../../worker/workerMain"; // eslint-disable-line import/no-webpack-loader-syntax

const RunButton = () => {
	const { code } = useContext(EditorContext);

	return (
		<button
			onClick={() => {
				// Import your worker
				// Create an instance of your worker
				const workerInstance = worker();
				// Attach an event listener to receive calculations from your worker
				workerInstance.addEventListener("message", (message) => {
					switch (message.data.type) {
						case "DONE":
							console.log(message.data.primes);
							workerInstance.terminate();
							break;
						case "RPC":
							break;
						default:
							console.log("UNKNOWN MESSAGE TYPE", message.data.type);
					}
				});
				// Run your calculations
				workerInstance.calculatePrimes(500, 1000000000);
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
