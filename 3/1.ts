const text = await Deno.readTextFile("input.txt");

const ruckSacks = text
	.split("\n")
	.map((line) => {
		const halfIndex = line.length / 2;

		const [first, second] = [
			line.slice(0, halfIndex),
			line.slice(halfIndex, line.length),
		];

		const char = first.split("").filter((char) => second.includes(char))[0];

		if (!char) return 0;

		const isLowerCase = char === char.toLowerCase();

		return char.charCodeAt(0) - (isLowerCase ? 96 : 38);
	})
	.reduce((acc, curr) => acc + curr);

console.log(ruckSacks);
