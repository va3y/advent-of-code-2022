type Monkey = {
  itemsInspected: number;
  items: number[];
  operation: (item: number) => number;
  test: (item: number) => number;
  divisor: number;
};

const input = await Deno.readTextFile("input.txt");

const monkeys = input.split("Monkey ").filter((val) => val).map(
  (monkeyString) => {
    const lines = monkeyString.split("\n");

    const monkey: Monkey = {
      itemsInspected: 0,
      divisor: parseInt(
        lines[3].replace("Test: divisible by ", ""),
      ),
      items: lines[1].replace("Starting items: ", "").split(", ").map((str) =>
        parseInt(str, 10)
      ),
      operation: (item) => {
        const [operation, _space, ...amountString] = lines[2].replace(
          "  Operation: new = old ",
          "",
        );

        const amount = amountString.join("") === "old"
          ? item
          : parseInt(amountString.join(""));

        const resultBeforeBored = operation === "*"
          ? item * amount
          : item + amount;

        return resultBeforeBored;
      },
      test: (item) => {
        const divisibleBy = parseInt(
          lines[3].replace("Test: divisible by ", ""),
        );
        const ifTrue = parseInt(
          lines[4].replace("    If true: throw to monkey ", ""),
        );
        const ifFalse = parseInt(
          lines[5].replace("    If false: throw to monkey ", ""),
        );

        return item % divisibleBy === 0 ? ifTrue : ifFalse;
      },
    };

    return monkey;
  },
);

const globalMod = monkeys.reduce((a, b) => a * b.divisor, 1);

for (let i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    for (const item of monkey.items) {
      monkey.itemsInspected++;
      const newWorryLevel = monkey.operation(item) % globalMod;
      monkeys[monkey.test(newWorryLevel)].items.push(newWorryLevel);
    }
    monkey.items = [];
  }
}

monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected);
