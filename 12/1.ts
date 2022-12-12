const input = await Deno.readTextFile("input.txt");

const grid = input.split("\n").map((row) =>
  row.split("").map((char) => char.codePointAt(0))
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

const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
const startObject = () => {
  const obj: Record<number, Record<number, any>> = {};
  let i = grid.length + 20;
  while (i >= 0) {
    obj[i] = {};
    i--;
  }
  return obj;
};

const historyOfSteps = startObject();

// need bfs instead of dfs. gotta add stack
function traverse(
  x: number,
  y: number,
  steps: number,
  visitedCells: Record<number, Record<number, boolean>>,
): number | undefined {
  historyOfSteps[y][x] = steps;
  console.log(steps);

  const curr = grid[y][x] as number;
  if (curr === "E".charCodeAt(0)) return steps;

  for (const [dirX, dirY] of directions) {
    const [newY, newX] = [dirY + y, dirX + x];
    const nextCell = grid[newY]?.[newX];

    if (
      nextCell !== undefined && !visitedCells[newY][newX] &&
      nextCell <= curr + 1 &&
      (historyOfSteps[dirY]?.[dirX] === undefined ||
        historyOfSteps[dirY][dirX] > steps)
    ) {
      visitedCells[newY][newX] = true;
      return traverse(
        newX,
        newY,
        ++steps,
        JSON.parse(JSON.stringify(visitedCells)),
      );
    }
  }
}

grid[start.y][start.x] = Infinity;
grid[end.y][end.x] = -1;

const res = traverse(start.x, start.y, 0, startObject());

console.log("answer", res);
