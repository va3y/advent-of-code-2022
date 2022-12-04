const input = await Deno.readTextFile("input.txt");
let count = 0;

input.split("\n").map((line) => {
	const [firstElv, secondElv] = line.split(",").map((elv) => {
		const [start, end] = elv.split("-").map((str) => parseInt(str, 10));
		return { start, end };
	});

	if (!(firstElv.end < secondElv.start || firstElv.start > secondElv.end))
		count++;
});

console.log(count);
