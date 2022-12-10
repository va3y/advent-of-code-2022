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

console.log(moves);

const head = { x: -9999999, y: -9999999 };
const tail = { x: -9999999, y: -9999999 };

/** https://en.wikipedia.org/wiki/Pairing_function */
function cantorPairing(a: number, b: number) {
  return (a + b) * (a + b + 1) / 2 + b;
}

const visitedPositions = new Set<number>();

for (const move of moves) {
  for (let i = 0; i < move.steps; i++) {
    // calc head
    if (move.move === Moves.Down) head.y--;
    if (move.move === Moves.Up) head.y++;
    if (move.move === Moves.Right) head.x++;
    if (move.move === Moves.Left) head.x--;

    // calc tail
    if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
      if (head.x < tail.x) tail.x--;
      if (head.x > tail.x) tail.x++;
      if (head.y < tail.y) tail.y--;
      if (head.y > tail.y) tail.y++;
    }

    visitedPositions.add(cantorPairing(tail.x, tail.y));
  }
}
console.log(visitedPositions);
console.log(visitedPositions.size);
