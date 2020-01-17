let runner = new Worker("../../worker/programRunner.js");

const stopWorker = () => {
	runner.terminate();
	runner = undefined;
};

runner.postMessage({
	type: "RUN_CODE",
	processor: processor,
	code: editorRef.current.editor.getValue()
});

runner.onmessage = (event) => {
	switch (event.data.type) {
		case "TERMINATE":
			stopWorker();
			break;
		default:
			console.log("UNKNWON EVENT TYPE");
	}
};
