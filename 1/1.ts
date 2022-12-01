const text = await Deno.readTextFile("input.txt");
let max = 0;
const deers = text.split("\n\n").map((deer) => deer.split("\n"));
for (const deer of deers) {
	const deerCalories = deer.reduce((acc, curr) => acc + Number(curr || 0), 0);
	max = Math.max(max, deerCalories);
}
console.log(max);
