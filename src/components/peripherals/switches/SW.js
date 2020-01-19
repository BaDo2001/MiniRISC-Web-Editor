import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Byte } from "../../../compiler/byte";

const SW = (props) => {
	const { x, y, text, byte, byteIndex } = props;
	const checkbox = useRef(null);

	const changeByteValue = () => {
		if (checkbox.current.checked) {
			byte.value += Math.pow(2, byteIndex);
		} else {
			byte.value -= Math.pow(2, byteIndex);
		}
	};

	useEffect(() => {
		const sw = checkbox.current;
		sw.addEventListener("click", changeByteValue);

		return () => {
			sw.removeEventListener("click", changeByteValue);
		};
	});

	return (
		<label className="switch" style={{ position: "absolute", top: y, left: x }}>
			<p style={{ position: "absolute", top: -30, left: 0 }}>{text}</p>
			<input type="checkbox" ref={checkbox} />
			<span className="sliderSW round"></span>
		</label>
	);
};

SW.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	byte: PropTypes.instanceOf(Byte).isRequired,
	byteIndex: PropTypes.number.isRequired
};

export default SW;
