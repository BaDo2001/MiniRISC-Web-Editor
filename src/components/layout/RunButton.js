import React, { useContext } from "react";
import EditorContext from "../../context/editor/editorContext";
import processor from "../../compiler/processor";

import WebWorker from "../../worker/WebWorker";
import worker from "../../worker/app.worker.js";

const RunButton = () => {
	const { code } = useContext(EditorContext);

	return (
		<button
			onClick={() => {
				let runner = new WebWorker(worker);
				let obj = JSON.parse(JSON.stringify(processor));

				runner.postMessage({
					type: "RUN_CODE",
					processor: obj,
					code: code
				});

				const stopWorker = () => {
					runner.terminate();
					runner = undefined;
				};

				runner.onmessage = (event) => {
					switch (event.data.type) {
						case "TERMINATE":
							stopWorker();
							break;
						case "ERROR":
							console.log("ERROR IN WEB WORKER");
							break;
						default:
							console.log("UNKNWON EVENT TYPE");
					}
				};
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
