const input = await Deno.readTextFile("input.txt");

const paths = input.split("\n").map((line) =>
  line.split(" -> ").map((coords) => {
    const [x, y] = coords.split(",");

    return { x: parseInt(x), y: parseInt(y) };
  })
);

// x-y
const walls = new Set<string>();

for (const path of paths) {
  for (let i = 0; i < path.length - 1; i++) {
    const curr = path[i];
    const next = path[i + 1];
    walls.add(`${curr.x}-${curr.y}`);

    while (curr.x !== next.x) {
      if (curr.x > next.x) curr.x--;
      else curr.x++;
      walls.add(`${curr.x}-${curr.y}`);
    }

    while (curr.y !== next.y) {
      if (curr.y > next.y) curr.y--;
      else curr.y++;
      walls.add(`${curr.x}-${curr.y}`);
    }
  }
}
const abyssYPoint =
  Array(...walls.values()).map((str) => parseInt(str.split("-")[1])).sort(
    (a, b) => {
      return b - a;
    },
  )[0] + 1;

let sand = { x: 500, y: 0 };
console.log(abyssYPoint);
let ans = 0;
const reset = () => sand = { x: 500, y: 0 };

while (true) {
  const current = `${sand.x}-${sand.y}`;
  const belowPoint = `${sand.x}-${sand.y + 1}`;
  const left = `${sand.x - 1}-${sand.y + 1}`;
  const right = `${sand.x + 1}-${sand.y + 1}`;

  console.log(sand);

  if (sand.y > abyssYPoint) {
    console.log("abyss!");
    console.log(walls, ans);
    break;
  }

  if (walls.has(belowPoint) && walls.has(left) && walls.has(right)) {
    walls.add(current);
    ans++;
    reset();
    continue;
  }
  if (walls.has(belowPoint) && !walls.has(left)) {
    sand.x--;
    sand.y++;
    // walls.add(left);
    continue;
  }
  if (walls.has(belowPoint) && !walls.has(right)) {
    sand.x++;
    sand.y++;
    // walls.add(right);
    continue;
  }

  sand.y++;
}
