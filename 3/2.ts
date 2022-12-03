const text = await Deno.readTextFile("input.txt");

const ruckSacks = text
	.split("\n")
	.map((first, i, arr) => {
		if (i % 3 !== 0) return 0;

		const second = arr[i + 1];
		const third = arr[i + 2];

		const char = first
			.split("")
			.filter((char) => second.includes(char) && third.includes(char))[0];

		if (!char) return 0;

		const isLowerCase = char === char.toLowerCase();

		return char.charCodeAt(0) - (isLowerCase ? 96 : 38);
	})
	.reduce((acc, curr) => acc + curr);

console.log(ruckSacks);
