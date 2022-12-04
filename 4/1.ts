const input = await Deno.readTextFile("input.txt");
let count = 0;

input.split("\n").map((line) => {
	const [[firstElvStart, firstElvEnd], [secondElvStart, secondElvEnd]] = line
		.split(",")
		.map((elv) => elv.split("-").map((str) => parseInt(str, 10)));

	if (firstElvStart <= secondElvStart && firstElvEnd >= secondElvEnd) count++;
	else if (firstElvStart >= secondElvStart && firstElvEnd <= secondElvEnd)
		count++;
});

console.log(count);
