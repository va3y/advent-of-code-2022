const input = await Deno.readTextFile("input.txt");

const chars = input.split("");
console.log(chars.length);

const uniqueCharsLength = 14;

for (let i = 0; i < chars.length - uniqueCharsLength; i++) {
	const currentSlice = new Set(
		Array(uniqueCharsLength)
			.fill(null)
			.map((_, arrayIndex) => chars[arrayIndex + i])
	);

	if (currentSlice.size === uniqueCharsLength) {
		console.log(`answer is ${i + uniqueCharsLength}`);
		break;
	}
}
