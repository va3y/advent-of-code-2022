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

const head = { x: 1, y: 1 };
const tail = { x: 1, y: 1 };

const visitedPositions = new Set<string>();

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

    visitedPositions.add(`${tail.x} ${tail.y}`);
  }
}
console.log(visitedPositions.size);
