const input = await Deno.readTextFile("input.txt");

const pairs = input.split("\n\n").map((pairStirng) =>
  pairStirng.split("\n").map((part) => JSON.parse(part))
);

console.log(pairs);

type CompareType = number | CompareType[];

function compare(aList: CompareType[], bList: CompareType[]): boolean {
  for (let i = 0; i < Math.max(aList.length, bList.length); i++) {
    const a = aList[i];
    const b = bList[i];
    if (a === undefined) return true;
    if (b === undefined) return false;

    if (typeof a === "number" && typeof a === "number") {
      if (a !== b) return a < b;
    }

    if (Array.isArray(a) || Array.isArray(b)) {
      const res = compare(
        Array.isArray(a) ? a : [a],
        Array.isArray(b) ? b : [b],
      );

      if (!res) return false;
    }
  }
  return true;
}

let count = 0;
let answer = 0;
for (const [a, b] of pairs) {
  count++;
  console.log(compare(a, b));
  if (compare(a, b)) answer += count;
}
// 1200 - low
console.log(pairs.length, answer);
