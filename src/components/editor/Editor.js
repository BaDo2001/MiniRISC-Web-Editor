import React, { useState, useRef, useContext, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import setup from "./languageSetup";
import { Rnd } from "react-rnd";
import EditorContext from "../../context/editor/editorContext";

const Editor = () => {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});

	const editorRef = useRef(null);

	const { setValue, code } = useContext(EditorContext);

	useEffect(() => {
		setSize({ width: window.innerWidth * 0.5, height: window.innerHeight - 20 });

		function handleResize() {
			setSize({ width: window.innerWidth * 0.5, height: window.innerHeight - 20 });
		}
		window.addEventListener("resize", handleResize);
	}, []);

	const onChange = () => {
		setValue(editorRef.current.editor.getValue());
	};

	return (
		<Rnd
			size={size}
			position={{ x: 0, y: 10 }}
			onResize={(e, d, ref) => {
				setSize({ width: ref.style.width, height: ref.style.height });
			}}
			minWidth={300}
			minHeight={200}
			style={{
				zIndex: 100
			}}
			enableResizing={{
				top: false,
				right: true,
				bottom: true,
				left: false,
				topRight: false,
				bottomRight: true,
				bottomLeft: false,
				topLeft: false
			}}
			disableDragging={true}
		>
			<MonacoEditor
				width={size.width}
				height={size.height}
				theme={"myCoolTheme"}
				language={"MiniRISC-Assembly"}
				value={code}
				editorWillMount={setup}
				onChange={onChange}
				ref={editorRef}
			/>
		</Rnd>
	);
};

export default Editor;
/*

		
		*/
