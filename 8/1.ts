class Tree {
  constructor(public height: number, public isVisible: boolean) {}
}

const input = await Deno.readTextFile("input.txt");

const treesInStirng = input.split("\n").map((row) => row.split(""));

const trees = treesInStirng.map((row) =>
  row.map((tree) => new Tree(parseInt(tree, 10), false))
);

for (const row of trees) {
  let currentHeight = -Infinity;
  for (let i = 0; i < row.length; i++) {
    if (row[i].height > currentHeight) {
      row[i].isVisible = true;
      currentHeight = row[i].height;
    }
  }

  currentHeight = -Infinity;
  for (let i = row.length - 1; i >= 0; i--) {
    if (row[i].height > currentHeight) {
      row[i].isVisible = true;
      currentHeight = row[i].height;
    }
  }
}

for (let i = 0; i < trees.length; i++) {
  let currentHeight = -Infinity;

  for (let j = 0; j < trees.length; j++) {
    if (trees[j][i].height > currentHeight) {
      trees[j][i].isVisible = true;
      currentHeight = trees[j][i].height;
    }
  }

  currentHeight = -Infinity;

  for (let j = trees[i].length - 1; j >= 0; j--) {
    if (trees[j][i].height > currentHeight) {
      trees[j][i].isVisible = true;
      currentHeight = trees[j][i].height;
    }
  }
}

let answer = 0;

for (const row of trees) {
  for (const tree of row) {
    if (tree.isVisible) answer++;
  }
}

console.log(trees);
console.log(answer);
