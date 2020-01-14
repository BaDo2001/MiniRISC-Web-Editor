import { mod256 } from "./flags";

export class Byte {
	constructor() {
		this.value = 0;
		this.onChange = null;
	}

	mov = (value) => {
		this.value = value;
	};

	add = (value, flags) => {
		let result = this.value + value;
		flags.setFlagsArithmetic(this.value, value, result, "ADD");
		this.value = mod256(result);
	};

	adc = (value, flags) => {
		let result = this.value + value + flags.c;
		flags.setFlagsArithmetic(this.value, value, result, "ADD");
		this.value = mod256(result);
	};

	sub = (value, flags) => {
		let result = this.value - value;
		flags.setFlagsArithmetic(this.value, value, result, "SUB");
		this.value = mod256(result);
	};

	sbc = (value, flags) => {
		let result = this.value - value - flags.c;
		flags.setFlagsArithmetic(this.value, value, result, "SUB");
		this.value = mod256(result);
	};

	cmp = (value, flags) => {
		flags.setFlagsArithmetic(this.value, value, this.value - value, "SUB");
	};

	and = (value, flags) => {
		this.value = value & this.value;
		flags.setFlagsLogical(this.value);
	};

	or = (value, flags) => {
		this.value = value | this.value;
		flags.setFlagsLogical(this.value);
	};

	xor = (value, flags) => {
		this.value = value ^ this.value;
		flags.setFlagsLogical(this.value);
	};

	tst = (value, flags) => {
		flags.setFlagsLogical(this.value & value);
	};

	swp = (flags) => {
		this.value = (this.value >>> 4) + (this.value % 16 << 4);
		flags.setFlagsLogical(this.value);
	};

	sl0 = (flags) => {
		let carry = this.value >>> 7;
		this.value = mod256(this.value << 1);
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	sl1 = (flags) => {
		let carry = this.value >>> 7;
		this.value = mod256((this.value << 1) + 1);
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	sr0 = (flags) => {
		let carry = this.value % 2;
		this.value = this.value >>> 1;
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	sr1 = (flags) => {
		let carry = this.value % 2;
		this.value = (this.value >>> 1) + 128;
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	asr = (flags) => {
		let carry = this.value % 2;
		this.value = (this.value >>> 1) + (this.value >>> 7) * 128;
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	rol = (flags) => {
		let carry = this.value >>> 7;
		this.value = mod256((this.value << 1) + carry);
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	ror = (flags) => {
		let carry = this.value % 2;
		this.value = (this.value >> 1) + carry * 128;
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	rlc = (flags) => {
		let carry = this.value >>> 7;
		this.value = mod256((this.value << 1) + flags.c);
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	rrc = (flags) => {
		let carry = this.value % 2;
		this.value = (this.value >> 1) + flags.c * 128;
		flags.setFlagsShiftOrRotate(this.value, carry);
	};

	getValue = () => {
		return `Value: ${this.value.toString()}`;
	};

	toBinary = () => {
		return this.value.toString(2);
	};

	toHex = () => {
		return this.value.toString(16);
	};
}

function createByteArray(size) {
	let array = new Array(size);
	for (let i = 0; i < size; i++) {
		array[i] = new Byte();
	}
	return array;
}

export default createByteArray;
