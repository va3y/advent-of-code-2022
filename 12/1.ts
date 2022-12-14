const input = await Deno.readTextFile("input.txt");

const grid = input.split("\n").map((row) =>
  row.split("").map((char) => char.codePointAt(0) as number)
);

const start = grid.reduce((_acc, curr, y) => {
  const x = curr.findIndex((char) => char === "S".codePointAt(0));
  if (x !== -1) return { y, x };
  return _acc;
}, { x: 0, y: 0 });
const end = grid.reduce((_acc, curr, y) => {
  const x = curr.findIndex((char) => char === "E".codePointAt(0));
  if (x !== -1) return { y, x };
  return _acc;
}, { x: 0, y: 0 });


grid[start.y][start.x] = Infinity;
grid[end.y][end.x] = Infinity;

const paths: { x: number; y: number }[][] = [[start]];

const visitedCells = new Set<string>();

while (paths.length) {
  console.log(paths.length)
  const currentPath = paths[0];
  const lastCell = currentPath[currentPath.length - 1];

  


  const directions = [
    { x: lastCell.x, y: lastCell.y + 1 },
    { x: lastCell.x, y: lastCell.y - 1 },
    { x: lastCell.x + 1, y: lastCell.y },
    { x: lastCell.x - 1, y: lastCell.y },
  ];

  for (const direction of directions) {
    if (direction.x === end.x && direction.y === end.y && grid[lastCell.y]?.[lastCell.x] === 'z'.codePointAt(0)) {
      console.log("answer: ", currentPath.length, currentPath);
      break;
    }

    

    if (
      !visitedCells.has(`${direction.x}-${direction.y}`) &&
      grid[direction.y]?.[direction.x] &&
      grid[direction.y][direction.x] <
        grid[lastCell.y][lastCell.x] + 2 as unknown as number
    ) {
      visitedCells.add(`${direction.x}-${direction.y}`);

      paths.push([...JSON.parse(JSON.stringify(currentPath)), {
        x: direction.x,
        y: direction.y,
      }]);
    }
  }

  paths.shift();
}

