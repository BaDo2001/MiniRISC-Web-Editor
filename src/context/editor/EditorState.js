import React, { useReducer } from "react";
import EditorContext from "./editorContext";
import EditorReducer from "./editorReducer";
import { SET_VALUE } from "../types";

import initialCode from "../../components/editor/codeSample";

const EditorState = (props) => {
	const [state, dispatch] = useReducer(EditorReducer, {
		code: initialCode
	});

	const setValue = (value) => {
		dispatch({ type: SET_VALUE, payload: value });
	};

	return (
		<EditorContext.Provider
			value={{
				code: state.code,
				setValue
			}}
		>
			{props.children}
		</EditorContext.Provider>
	);
};

export default EditorState;
