this.onmessage = (e) => {
	switch (e.data.type) {
		case "RUN_CODE":
			const { processor, code } = e.data;
			processor.run(code);
	}
};
