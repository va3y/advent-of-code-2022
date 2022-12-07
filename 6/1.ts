const input = await Deno.readTextFile("input.txt");

const chars = input.split("");
console.log(chars.length);

for (let i = 0; i < chars.length - 4; i++) {
	const currentSlice = new Set([
		chars[i],
		chars[i + 1],
		chars[i + 2],
		chars[i + 3],
	]);

	if (currentSlice.size === 4) {
		console.log(`answer is ${i + 4}`);
		break;
	}
}
