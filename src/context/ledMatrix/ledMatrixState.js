import React, { useReducer, useRef } from "react";
import LedMatrixContext from "./ledMatrixContext";
import LedMatrixReducer from "./ledMatrixReducer";

const LedMatrixState = (props) => {
	const [state] = useReducer(LedMatrixReducer, {
		col0Canvas: useRef(null),
		col1Canvas: useRef(null),
		col2Canvas: useRef(null),
		col3Canvas: useRef(null),
		col4Canvas: useRef(null)
	});

	return (
		<LedMatrixContext.Provider
			value={{
				col0Canvas: state.col0Canvas,
				col1Canvas: state.col1Canvas,
				col2Canvas: state.col2Canvas,
				col3Canvas: state.col3Canvas,
				col4Canvas: state.col4Canvas
			}}
		>
			{props.children}
		</LedMatrixContext.Provider>
	);
};

export default LedMatrixState;
