import Flags from "./flags";
import createByteArray from "./byte";
import {
	convertToDecimal,
	preCompile,
	isLabel,
	getDestByte,
	getSrcValue,
	getCodeIndex
} from "./compiler";

class Processor {
	constructor() {
		this.flags = new Flags();
		this.registers = createByteArray(16);
		this.memory = createByteArray(256);
		this.definedMemorySpaces = {};
		this.dataLabels = {};
		this.codeLabels = {};
		this.codeIndex = 0;
		this.stack = [];
	}

	setDefs = (defs) => {
		//Goes through all of the defs
		for (let [name, address] of defs) {
			//For each def it stores its location in the memory
			this.definedMemorySpaces[name] = convertToDecimal(address);
		}
	};

	setData = (dataPart) => {
		//Start defining data from the start of memory
		let dataIndex = 0;
		//Go through each line of data
		for (let line of dataPart) {
			//If it is a label then we store its memory location
			if (isLabel(line)) this.dataLabels[line[0].slice(0, -1)] = dataIndex;
			//Else if it is an org then set data index to the given memory location
			else if (line[0] === "org") dataIndex = convertToDecimal(line[1]);
			else {
				//Otherwise it must be data
				for (let i = 1; i < line.length; i++) {
					//If the current data item starts with a " then it is a string
					if (line[i][0] === '"') {
						//So we go through char by char (Except the first and last because they are " -s)
						for (let j = 1; j < line[i].length - 1; j++) {
							//We store each characters ascii code as a byte
							this.memory[dataIndex].mov(line[i][j].charCodeAt(0));
							dataIndex++;
						}
					} else {
						//If it is not a string then it is a number
						//So we convert it to decimal and store it as a byte
						this.memory[dataIndex].mov(convertToDecimal(line[i]));
						dataIndex++;
					}
				}
			}
		}
	};

	setCodeLabels = (code) => {
		let i = 0;
		while (i < code.length) {
			if (isLabel(code[i])) {
				this.codeLabels[code[i][0].slice(0, -1)] = i;
				code.splice(i, 1);
			} else {
				i++;
			}
		}
		return code;
	};

	runLine = (line) => {
		let destByte, srcValue;
		switch (line[0]) {
			case "mov":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.mov(srcValue);
				if (destByte.onChange !== null) destByte.onChange();
				this.codeIndex++;
				break;
			case "add":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.add(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "adc":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.adc(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "sub":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.sub(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "sbc":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.sbc(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "cmp":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.cmp(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "and":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.and(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "or":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.or(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "xor":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.xor(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "tst":
				destByte = getDestByte(line[1], this);
				srcValue = getSrcValue(line[2], this);
				destByte.tst(srcValue, this.flags);
				this.codeIndex++;
				break;
			case "swp":
				destByte = getDestByte(line[1], this);
				destByte.swp(this.flags);
				this.codeIndex++;
				break;
			case "sl0":
				destByte = getDestByte(line[1], this);
				destByte.sl0(this.flags);
				this.codeIndex++;
				break;
			case "sl1":
				destByte = getDestByte(line[1], this);
				destByte.sl1(this.flags);
				this.codeIndex++;
				break;
			case "sr0":
				destByte = getDestByte(line[1], this);
				destByte.sr0(this.flags);
				this.codeIndex++;
				break;
			case "sr1":
				destByte = getDestByte(line[1], this);
				destByte.sr1(this.flags);
				this.codeIndex++;
				break;
			case "asr":
				destByte = getDestByte(line[1], this);
				destByte.asr(this.flags);
				this.codeIndex++;
				break;
			case "rol":
				destByte = getDestByte(line[1], this);
				destByte.rol(this.flags);
				this.codeIndex++;
				break;
			case "ror":
				destByte = getDestByte(line[1], this);
				destByte.ror(this.flags);
				this.codeIndex++;
				break;
			case "rlc":
				destByte = getDestByte(line[1], this);
				destByte.rlc(this.flags);
				this.codeIndex++;
				break;
			case "rrc":
				destByte = getDestByte(line[1], this);
				destByte.rrc(this.flags);
				this.codeIndex++;
				break;
			case "jmp":
				this.codeIndex = getCodeIndex(line[1], this);
				break;
			case "jz":
				this.codeIndex = this.flags.z ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jnz":
				this.codeIndex = !this.flags.z ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jc":
				this.codeIndex = this.flags.c ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jnc":
				this.codeIndex = !this.flags.c ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jn":
				this.codeIndex = this.flags.n ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jnn":
				this.codeIndex = !this.flags.n ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jv":
				this.codeIndex = this.flags.v ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jnv":
				this.codeIndex = !this.flags.v ? getCodeIndex(line[1], this) : this.codeIndex + 1;
				break;
			case "jsr":
				this.stack.unshift({ type: "SUBROUTINE", codeIndex: this.codeIndex + 1 });
				this.codeIndex = getCodeIndex(line[1], this);
				break;
			case "rts":
				if (this.stack.length > 0) {
					let stackItem = this.stack.shift();
					if (stackItem.type === "SUBROUTINE") this.codeIndex = stackItem.codeIndex;
					else console.log("STACK ERROR, THE LAST ITEM IN STACK WAS NOT A SUBROUTINE CALL");
				}
				break;
			default:
				break;
		}
	};

	run = (code) => {
		this.reset();
		let [codePart, dataPart, defs] = preCompile(code);
		this.setDefs(defs);
		this.setData(dataPart);
		codePart = this.setCodeLabels(codePart);
		while (this.codeIndex < codePart.length) {
			this.runLine(codePart[this.codeIndex]);
		}
	};

	reset = () => {
		this.flags.clear();
		for (let reg of this.registers) {
			reg.value = 0;
		}
		for (let byte of this.memory) {
			byte.value = 0;
		}
		this.codeIndex = 0;
	};
}

const processor = new Processor();
/*
const testF = () => {
	processor.run(
		`
			code
		mov 0x90, #${Math.floor(Math.random() * 255)}
		mov 0x91, #${Math.floor(Math.random() * 255)}
		mov 0x92, #${Math.floor(Math.random() * 255)}
		mov 0x93, #${Math.floor(Math.random() * 255)}
		mov 0x94, #${Math.floor(Math.random() * 255)}
		mov 0x95, #${Math.floor(Math.random() * 255)}
		mov 0x96, #${Math.floor(Math.random() * 255)}
		mov 0x97, #${Math.floor(Math.random() * 255)}
		mov 0x98, #${Math.floor(Math.random() * 255)}
		`
	);
	//setTimeout(testF, 100);
};
setTimeout(testF, 100);*/
export default processor;
