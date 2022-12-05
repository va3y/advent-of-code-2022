const input = await Deno.readTextFile("input.txt");
const stacks = [
	[],
	["W", "B", "D", "N", "C", "F", "J"],
	["P", "Z", "V", "Q", "L", "S", "T"],
	["P", "Z", "B", "G", "J", "T"],
	["D", "T", "L", "J", "Z", "B", "H", "C"],
	["G", "V", "B", "J", "S"],
	["P", "S", "Q"],
	["B", "V", "D", "F", "L", "M", "P", "N"],
	["P", "S", "M", "F", "B", "D", "L", "R"],
	["V", "D", "T", "R"],
];

const moves = input
	.split("\n\n")[1]
	.split("\n")
	.map((line) =>
		line.match(/\d+/g)?.map((digit) => parseInt(digit))
	) as number[][];

for (const [amount, stackFrom, stackTo] of moves) {
	const tempStack = [];
	for (let i = 0; i < amount; i++) {
		const item = stacks[stackFrom]?.pop();

		if (item) tempStack.push(item);
	}
	tempStack.reverse();
	stacks[stackTo].push(...tempStack);
}
const answer = stacks.map((stack) => stack[stack.length - 1]);
console.log(answer, answer.join(""));
