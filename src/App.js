import React from "react";
import "./App.css";

import Editor from "./components/editor/Editor";
import EditorState from "./context/editor/EditorState";

import SevenSegmentDisplays from "./components/peripherals/7seg/SevenSegmentDisplays";
import LedMatrix from "./components/peripherals/ledMatrix/LedMatrix";
import Switches from "./components/peripherals/switches/Switches";
import RunButton from "./components/layout/RunButton";

function App() {
	return (
		<EditorState>
			<RunButton />
			<Editor />
			<SevenSegmentDisplays x={window.innerWidth * 0.5 + 10} y={70} />
			<LedMatrix x={window.innerWidth * 0.5 + 10} y={260} />
			<Switches x={window.innerWidth * 0.5 + 320} y={260} />
		</EditorState>
	);
}

export default App;
