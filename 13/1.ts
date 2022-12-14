const input = await Deno.readTextFile("input.txt");

const pairs = input.split("\n\n").map((pairStirng) =>
  pairStirng.split("\n").map((part) => JSON.parse(part))
);

console.log(pairs);

type CompareType = number | CompareType[];

function compare(aList: CompareType[], bList: CompareType[]): boolean {
  for (const [index, a] of Object.entries(aList)) {
    const b = bList[parseInt(index)];
    if (a === undefined || b === undefined) return true;
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

for (const [a, b] of pairs) {
  console.log(compare(a, b));
}
