export function convertToDecimal(x) {
	//If string has 0b at the start then it is binary so we convert from binary to decimal
	if (x.indexOf("0b", 0) === 0) return parseInt(x.slice(2), 2);
	//If string has 0x at the start then it is hex so we convert from hex to decimal
	else if (x.indexOf("0x", 0) === 0) return parseInt(x.slice(2), 16);
	//Otherwise it is decimal already
	else return parseInt(x, 10);
}

function isDigit(x) {
	return !isNaN(parseInt(x));
}

export function isLabel(item) {
	//If there's nothing else on the line other than some words and a : then it is a label
	return item.length === 1 && item[0].indexOf(":") > -1;
}

function getRegisterIndex(register) {
	return parseInt(register.slice(1));
}

function isRegister(item) {
	return item[0] === "r";
}

function isAddress(item) {
	return isDigit(item[0]);
}

function isIndirectRegister(item) {
	return item[0] === "(";
}

function isNumericConstant(item) {
	return item[0] === "#" && isDigit(item[1]);
}

function isDefinedMemory(item, definedMemorySpaces) {
	return definedMemorySpaces.hasOwnProperty(item);
}

function isAddressOfDefinedMemory(item, definedMemorySpaces) {
	return definedMemorySpaces.hasOwnProperty(item.slice(1));
}

function isDataLabel(item, dataLabels) {
	return dataLabels.hasOwnProperty(item);
}

function isAddressOfDataLabel(item, dataLabels) {
	return dataLabels.hasOwnProperty(item.slice(1));
}

function getType(item, definedMemorySpaces, dataLabels) {
	if (isRegister(item)) return "REGISTER";
	else if (isIndirectRegister(item)) return "INDIRECT_REGISTER";
	else if (isAddress(item)) return "ADDRESS";
	else if (isNumericConstant(item)) return "NUMERIC_CONSTANT";
	else if (isDefinedMemory(item, definedMemorySpaces)) return "DEFINED_MEMORY";
	else if (isAddressOfDefinedMemory(item, definedMemorySpaces)) return "ADDRESS_OF_DEFINED_MEMORY";
	else if (isDataLabel(item, dataLabels)) return "DATA_LABEL";
	else if (isAddressOfDataLabel(item, dataLabels)) return "ADDRESS_OF_DATA_LABEL";
}

export function getSrcValue(src, processor) {
	let { registers, memory, definedMemorySpaces, dataLabels } = processor;
	let type = getType(src, definedMemorySpaces, dataLabels);
	let registerIndex, memoryIndex;
	switch (type) {
		case "REGISTER":
			registerIndex = getRegisterIndex(src);
			return registers[registerIndex].value;
		case "INDIRECT_REGISTER":
			registerIndex = getRegisterIndex(src.slice(1, -1));
			return registers[registerIndex].value;
		case "ADDRESS":
			memoryIndex = convertToDecimal(src);
			return memory[memoryIndex].value;
		case "NUMERIC_CONSTANT":
			return convertToDecimal(src.slice(1));
		case "DEFINED_MEMORY":
			memoryIndex = definedMemorySpaces[src];
			return memory[memoryIndex].value;
		case "ADDRESS_OF_DEFINED_MEMORY":
			return definedMemorySpaces[src.slice(1)];
		case "DATA_LABEL":
			memoryIndex = dataLabels[src];
			return memory[memoryIndex];
		case "ADDRESS_OF_DATA_LABEL":
			return dataLabels[src.slice(1)];
		default:
			break;
	}
	console.log("INVALID SOURCE");
}

export function getDestByte(dest, processor) {
	let { registers, memory, definedMemorySpaces, dataLabels } = processor;
	let type = getType(dest, definedMemorySpaces, dataLabels);
	let registerIndex, memoryIndex;
	switch (type) {
		case "REGISTER":
			registerIndex = getRegisterIndex(dest);
			return registers[registerIndex];
		case "ADDRESS":
			memoryIndex = convertToDecimal(dest);
			return memory[memoryIndex];
		case "INDIRECT_REGISTER":
			registerIndex = getRegisterIndex(dest.slice(1, -1));
			memoryIndex = registers[registerIndex].value;
			return memory[memoryIndex];
		case "DEFINED_MEMORY":
			memoryIndex = definedMemorySpaces[dest];
			return memory[memoryIndex];
		case "DATA_LABEL":
			memoryIndex = dataLabels[dest];
			return memory[memoryIndex];
		default:
			break;
	}
	console.log("INVALID DESTINATION");
}

function sliceToWords(line) {
	//Remove comments from end (everything before the first ; is code and everything else is comment)
	line = line.split(";")[0];
	//Remove indentation from beginning and any whitespace from end
	line = line.trim();
	//If the line is now empty, then it only had whitespace or comments thus it can be thrown out
	if (line === "") {
		return [true, line];
	}
	//Split it up to words
	line = line.split(" ");
	for (let i = line.length - 1; i >= 0; i--) {
		//If there were unnecessary spaces between words they are removed
		if (line[i] === "") {
			line.splice(i, 1);
			continue;
		}
		//And if a word had a , after it then the , is removed
		if (line[i][line[i].length - 1] === ",") {
			line[i] = line[i].slice(0, line[i].length - 1);
		}
	}
	return [false, line];
}

function sortLines(lines) {
	let i = 0;
	let defs = [],
		dataPart = [],
		codePart = [];
	let status = "DATA";
	while (i < lines.length) {
		//Rip off everything from the line so only relevant parts stay
		let [isEmpty, line] = sliceToWords(lines[i]);
		//If nothing is relevant then we throw the line out
		if (isEmpty) lines.splice(i, 1);
		else {
			i++;
			//The lines from here belong to codePart
			if (line[0] === "code") {
				status = "CODE";
				//Except if they are DEFs
			} else if (line[0] === "def") {
				defs.push(line.slice(1));
				//If status is DATA then if it is not the 'data' keyword then it belongs to data
			} else if (status === "DATA") {
				if (line[0] !== "data") dataPart.push(line);
				//If status is CODE then it belongs to code
			} else if (status === "CODE") {
				codePart.push(line);
			}
		}
	}

	return [codePart, dataPart, defs];
}

export function preCompile(code) {
	let lines = code.toLowerCase().split("\n");
	return sortLines(lines);
}

function isCodeLabel(item, labels) {
	return labels.hasOwnProperty(item);
}

export function getCodeIndex(dest, processor) {
	if (isDigit(dest[0])) {
		return convertToDecimal(dest);
	} else if (isCodeLabel(dest, processor.codeLabels)) {
		return processor.codeLabels[dest];
	}
}
