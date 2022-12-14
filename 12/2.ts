const input = await Deno.readTextFile("input.txt");

const grid = input.split("\n").map((row) =>
  row.split("").map((char) => char.codePointAt(0) as number)
);

const start = grid.reduce((acc, curr, y) => {
  const x = curr.findIndex((char) => char === "a".codePointAt(0));
  if (x !== -1) acc.push({ x, y });
  return acc;
}, [] as { x: number; y: number }[]);
const end = grid.reduce((_acc, curr, y) => {
  const x = curr.findIndex((char) => char === "E".codePointAt(0));
  if (x !== -1) return { y, x };
  return _acc;
}, { x: 0, y: 0 });

grid[end.y][end.x] = Infinity;

const paths: { x: number; y: number; id: number }[][] = [
  ...start.map((point, i) => [{ ...point, id: i }]),
];

const visitedCells = new Set<string>();
let answer = Infinity;

while (paths.length) {
  const currentPath = paths[0];
  const lastCell = currentPath[currentPath.length - 1];

  const directions = [
    { x: lastCell.x, y: lastCell.y + 1 },
    { x: lastCell.x, y: lastCell.y - 1 },
    { x: lastCell.x + 1, y: lastCell.y },
    { x: lastCell.x - 1, y: lastCell.y },
  ];

  for (const direction of directions) {
    if (
      direction.x === end.x && direction.y === end.y &&
      grid[lastCell.y]?.[lastCell.x] === "z".codePointAt(0)
    ) {
      answer = Math.min(answer, currentPath.length);
      break;
    }

    if (
      !visitedCells.has(`${lastCell.id}-${direction.x}-${direction.y}`) &&
      grid[direction.y]?.[direction.x] &&
      grid[direction.y][direction.x] <
        grid[lastCell.y][lastCell.x] + 2 as unknown as number
    ) {
      visitedCells.add(`${lastCell.id}-${direction.x}-${direction.y}`);

      paths.push([...JSON.parse(JSON.stringify(currentPath)), {
        x: direction.x,
        y: direction.y,
        id: lastCell.id,
      }]);
    }
  }

  paths.shift();
}

console.log("answer: ", answer);
