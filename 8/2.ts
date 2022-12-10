const input = await Deno.readTextFile("input.txt");

const treesInStirng = input.split("\n").map((row) => row.split(""));
const trees = treesInStirng.map((row) => row.map((tree) => parseInt(tree, 10)));
const WIDTH = trees[0].length;
const HEIGHT = trees.length;

let maxScore = 0;
trees.forEach((row, y) => row.forEach((_, x) => calcScore(x, y)));

function calcScore(startX: number, startY: number) {
  const startHeight = trees[startY][startX];

  let right = 1;
  for (let i = startX + 1; i < WIDTH; i++) {
    if (trees[startY][i] > startHeight) {
      right++;
    } else break;
  }

  let left = 1;
  for (let i = startX - 1; i >= 0; i--) {
    if (trees[startY][i] > startHeight) {
      left++;
    } else break;
  }

  let up = 1;
  for (let i = startY + 1; i < HEIGHT; i++) {
    if (trees[i][startX] > startHeight) {
      up++;
    } else break;
  }

  let down = 1;
  for (let i = startY - 1; i >= 0; i--) {
    if (trees[i][startX] > startHeight) {
      down++;
    } else break;
  }

  maxScore = Math.max(right * left * up * down, maxScore);
}

// 5040 - low
// 535040 - ?
console.log(maxScore);
