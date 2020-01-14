const setup = monaco => {
	if (!monaco.languages.getLanguages().some(({ id }) => id === "MiniRISC-Assembly")) {
		// Register a new language
		monaco.languages.register({ id: "MiniRISC-Assembly" });

		monaco.languages.setLanguageConfiguration("MiniRISC-Assembly", {
			autoClosingPairs: [
				{ open: '"', close: '"' },
				{ open: "[", close: "]" }
			]
		});

		// Register a tokens provider for the language
		monaco.languages.setMonarchTokensProvider("MiniRISC-Assembly", {
			defaultToken: "invalid",
			ignoreCase: true,
			commands: [
				"mov",
				"add",
				"adc",
				"sub",
				"sbc",
				"cmp",
				"and",
				"or",
				"xor",
				"tst",
				"swp",
				"sl0",
				"sl1",
				"sr0",
				"sr1",
				"asr",
				"rol",
				"ror",
				"rlc",
				"rrc",
				"jmp",
				"jz",
				"jnz",
				"jc",
				"jnc",
				"jn",
				"jnn",
				"jv",
				"jnv",
				"jsr",
				"rts",
				"sti",
				"cli",
				"rti"
			],

			keywords: ["def", "db", "data", "code", "org"],

			peripheralRegisters: [
				"ld",
				"sw",
				"tr",
				"tm",
				"tc",
				"ts",
				"bt",
				"btie",
				"btif",
				"uc",
				"us",
				"uie",
				"ud",
				"dc",
				"ds",
				"dsa",
				"dda",
				"dts",
				"dig0",
				"dig1",
				"dig2",
				"dig3",
				"col0",
				"col1",
				"col2",
				"col3",
				"col4",
				"ado",
				"adi",
				"adr",
				"cdo",
				"cdi",
				"cdr",
				"bdo",
				"bdi",
				"bdr",
				"ddo",
				"ddi",
				"ddr",
				"vc",
				"vs",
				"vie",
				"vif",
				"vd",
				"vx",
				"vy",
				"kbc",
				"kbs",
				"kbd"
			],

			operators: [
				"=",
				">",
				"<",
				"!",
				"~",
				"?",
				":",
				"==",
				"<=",
				">=",
				"!=",
				"&&",
				"||",
				"++",
				"--",
				"+",
				"-",
				"*",
				"/",
				"&",
				"|",
				"^",
				"%",
				"<<",
				">>",
				">>>",
				"+=",
				"-=",
				"*=",
				"/=",
				"&=",
				"|=",
				"^=",
				"%=",
				"<<=",
				">>=",
				">>>="
			],

			// we include these common regular expressions
			symbols: /[,#=><!~?:&|+\-*/^%]+/,

			// C# style strings
			escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

			// The main tokenizer for our languages
			tokenizer: {
				root: [
					// numbers
					[/0b/, "string", "@binary"],
					[/0x/, "string", "@hexa"],
					[/[0-9]/, "string", "@decimal"],

					// built-in registers
					[/r1[0-5]/, "register"],
					[/r[0-9]/, "register"],

					// identifiers and keywords
					[
						/[a-zA-Z0-9_$][\w$]*/,
						{
							cases: {
								"@keywords": "keyword",
								"@commands": "command",
								"@peripheralRegisters": "register",
								"@default": "label"
							}
						}
					],

					// whitespace
					{ include: "@whitespace" },

					// delimiters and operators
					[/[{}()[\]]/, "@brackets"],
					[/[<>](?!@symbols)/, "@brackets"],
					[/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],

					// strings
					[/"([^"\\]|\\.)*$/, "string.invalid"], // non-terminated string
					[/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

					// characters
					[/'[^\\']'/, "string"],
					[/(')(@escapes)(')/, ["string", "string.escape", "string"]],
					[/'/, "string.invalid"]
				],

				binary: [
					[/[ ,]/, "white", "@pop"],
					[/^/, "white", "@pop"],
					[/./, "string"]
				],

				hexa: [
					[/[ ,]/, "white", "@pop"],
					[/^/, "white", "@pop"],
					[/./, "string"]
				],

				decimal: [
					[/[ ,]/, "white", "@pop"],
					[/^/, "white", "@pop"],
					[/./, "string"]
				],

				comment: [
					[/^/, "white", "@pop"],
					[/./, "comment"]
				],

				string: [
					[/[^\\"]+/, "string"],
					[/@escapes/, "string.escape"],
					[/\\./, "string.escape.invalid"],
					[/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]
				],

				whitespace: [
					[/[ \t\r\n]+/, "white"],
					[/;/, "comment", "@comment"]
				]
			}
		});

		// Define a new theme that contains only rules that match this language
		monaco.editor.defineTheme("myCoolTheme", {
			base: "vs-dark",
			inherit: true,
			rules: [
				{ token: "command", foreground: "569ce6" },
				{ token: "keyword", foreground: "4EC9B0" },
				{ token: "string.invalid", foreground: "ff0000" },
				{ token: "label", foreground: "aa44af" },
				{ token: "register", foreground: "ffff88" }
			]
		});
	}
};

export default setup;
