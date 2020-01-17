import React, { useState, useEffect, useRef, useContext } from "react";
import MonacoEditor from "react-monaco-editor";
import setup from "./languageSetup";
import { Rnd } from "react-rnd";
import EditorContext from "../../context/editor/editorContext";

function constrain(x, min, max) {
	return Math.min(Math.max(min, x), max);
}

function handleWindowClick(editor) {
	let { column, lineNumber } = editor.getPosition();
	setTimeout(() => {
		editor.setPosition({ column: column, lineNumber: lineNumber });
	}, 0);
}

const Editor = () => {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});
	const [pos, setPos] = useState({
		x: 0,
		y: 0
	});

	const editorRef = useRef(null);

	const { setValue, code } = useContext(EditorContext);

	useEffect(() => {
		function handleResize() {
			setSize({ width: size.width, height: window.innerHeight - 2 });
		}
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	});

	const editorDidMount = (editor, monaco) => {
		setSize({ width: window.innerWidth * 0.5, height: window.innerHeight - 2 });
		window.addEventListener("click", () => {
			handleWindowClick(editor);
		});
	};

	const onDrag = (_, d) => {
		let newX = constrain(d.x, 0, window.innerWidth);
		let newY = constrain(d.y, 0, window.innerHeight);

		setPos({ x: newX, y: newY });
	};

	const onChange = () => {
		setValue(editorRef.current.editor.getValue());
	};

	return (
		<Rnd
			size={size}
			position={pos}
			onResize={(e, d, ref) => {
				setSize({ width: ref.style.width, height: ref.style.height });
			}}
			onDrag={onDrag}
			minWidth={300}
			minHeight={200}
			style={{
				zIndex: 100
			}}
		>
			<MonacoEditor
				width={size.width}
				height={size.height}
				theme={"myCoolTheme"}
				language={"MiniRISC-Assembly"}
				value={code}
				editorWillMount={setup}
				editorDidMount={editorDidMount}
				onChange={onChange}
				ref={editorRef}
			/>
		</Rnd>
	);
};

export default Editor;
