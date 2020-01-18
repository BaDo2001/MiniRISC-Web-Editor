export default () => {
	// eslint-disable-next-line no-restricted-globals
	self.addEventListener("message", (e) => {
		switch (e.data.type) {
			case "RUN_CODE":
				const { processor, code } = e.data;
				processor.run(code);
				postMessage({ type: "TERMINATE" });
				break;
			default:
				postMessage({ type: "ERROR" });
		}
	});
};
