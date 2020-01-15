import React from "react";
import "./App.css";
import Editor from "./components/editor/Editor";
import SevenSegmentDisplays from "./components/peripherals/7seg/SevenSegmentDisplays";
import LedMatrix from "./components/peripherals/ledMatrix/LedMatrix";

function App() {
	return (
		<div>
			<Editor />
			<SevenSegmentDisplays />
			<LedMatrix />
		</div>
	);
}

export default App;
