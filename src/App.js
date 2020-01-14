import React from "react";
import "./App.css";
import Editor from "./components/editor/Editor";
import SevenSegmentDisplays from "./components/peripherals/7seg/SevenSegmentDisplays";

function App() {
	return (
		<div>
			<Editor />
			<SevenSegmentDisplays />
		</div>
	);
}

export default App;
