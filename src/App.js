import React from "react";
import "./App.css";
import Editor from "./components/editor/Editor";
import SevenSegmentDisplays from "./components/peripherals/7seg/SevenSegmentDisplays";
import LedMatrix from "./components/peripherals/ledMatrix/LedMatrix";
import Switches from "./components/peripherals/switches/Switches";

function App() {
	return (
		<div>
			<Editor />
			<SevenSegmentDisplays x={window.innerWidth * 0.5 + 10} y={0} />
			<LedMatrix x={window.innerWidth * 0.5 + 10} y={190} />
			<Switches x={window.innerWidth * 0.5 + 10} y={620} />
		</div>
	);
}

export default App;
