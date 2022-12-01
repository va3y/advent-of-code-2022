const text = await Deno.readTextFile("input.txt");
const totalCalories: number[] = [];
const deers = text.split("\n\n").map((deer) => deer.split("\n"));
for (const deer of deers) {
	const deerCalories = deer.reduce((acc, curr) => acc + Number(curr || 0), 0);
	totalCalories.push(deerCalories);
}

totalCalories.sort((a, b) => a - b);
console.log(
	totalCalories[totalCalories.length - 1] +
		totalCalories[totalCalories.length - 2] +
		totalCalories[totalCalories.length - 3]
);
