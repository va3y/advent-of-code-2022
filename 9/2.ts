const input = await Deno.readTextFile("input.txt");
enum Moves {
  Up = "U",
  Down = "D",
  Right = "R",
  Left = "L",
}

const moves = input.split("\n").map((row) => {
  const [move, steps] = row.split(" ") as [Moves, string];

  return { move, steps: parseInt(steps) };
});

const head = { x: 1, y: 1 };
const tails = Array(9).fill(null).map(() => ({ x: 1, y: 1 }));

const visitedPositions = new Set<string>();

for (const move of moves) {
  for (let i = 0; i < move.steps; i++) {
    // calc head
    if (move.move === Moves.Down) head.y--;
    if (move.move === Moves.Up) head.y++;
    if (move.move === Moves.Right) head.x++;
    if (move.move === Moves.Left) head.x--;

    // calc tail

    tails.forEach((tail, i) => {
      const relativeHead = tails[i - 1] ?? head;
      if (
        Math.abs(relativeHead.x - tail.x) > 1 ||
        Math.abs(relativeHead.y - tail.y) > 1
      ) {
        if (relativeHead.x < tail.x) tail.x--;
        if (relativeHead.x > tail.x) tail.x++;
        if (relativeHead.y < tail.y) tail.y--;
        if (relativeHead.y > tail.y) tail.y++;
      }
    });

    const lastTail = tails[tails.length - 1];
    visitedPositions.add(`${lastTail.x} ${lastTail.y}`);
  }
}
// 2516 - low
console.log(visitedPositions.size);
