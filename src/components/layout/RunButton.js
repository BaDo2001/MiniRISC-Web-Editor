import React, { useContext } from "react";
import EditorContext from "../../context/editor/editorContext";

const RunButton = () => {
	const { code } = useContext(EditorContext);

	return (
		<button
			onClick={() => {}}
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
