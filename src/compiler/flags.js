export function mod256(x) {
	return (x + 256) % 256;
}

class Flags {
	constructor() {
		this.z = this.c = this.n = this.v = this.ie = this.if = 0;
	}

	clear = () => {
		//Set all flags to 0
		this.z = this.c = this.n = this.v = this.ie = this.if = 0;
	};

	setFlagsArithmetic = (v1, v2, result, operation) => {
		//set flags when an arithmetic operation was done

		//set zero flag to 1 if the result of the operation is zero
		this.z = mod256(result) === 0 ? 1 : 0;
		//set negative flag to 1 if the result of the operation has a msb of 1
		this.n = mod256(result) >= 128 ? 1 : 0;
		//set carry flag to 1 if the result of the operation is not equal to the result mod 256 (e.g. it either too big for 8 bits or it is negative)
		this.c = result < 0 || result > 255 ? 1 : 0;
		//detecting overflow is a little bit tricky
		//pos: msb is 0
		//neg: msb is 1
		//When adding two numbers overflow happens if pos + pos = neg or neg + neg = pos
		if (operation === "ADD") this.v = v1 >> 7 === v2 >> 7 && v1 >> 7 !== result >> 7 ? 1 : 0;
		//When subtracting two numbers overflow happens if pos - neg = neg or neg - pos = pos
		else this.v = result >> 7 === v2 >> 7 && v2 >> 7 !== v1 >> 7 ? 1 : 0;
	};

	setFlagsLogical = result => {
		//set zero flag to 1 if the result of the operation is zero
		this.z = mod256(result) === 0 ? 1 : 0;
		//set negative flag to 1 if the result of the operation has a msb of 1
		this.n = mod256(result) >= 128 ? 1 : 0;
	};

	setFlagsShiftOrRotate = (result, carry) => {
		//set zero flag to 1 if the result of the operation is zero
		this.z = mod256(result) === 0 ? 1 : 0;
		//set negative flag to 1 if the result of the operation has a msb of 1
		this.n = mod256(result) >= 128 ? 1 : 0;
		//When performing an operation like this the carry comes from a bit being shifted or rotated out
		this.c = carry;
	};

	getFlags = () => {
		return (
			" " + String(this.v) + " " + String(this.n) + " " + String(this.c) + " " + String(this.z)
		);
	};
}

export default Flags;
