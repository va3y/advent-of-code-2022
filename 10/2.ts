const ADDX_LENGTH = 2;

type Operation = { type: "addx"; value: number } | { type: "noop" };

const input = await Deno.readTextFile("input.txt");

const opeartions = input.split("\n").map((line): Operation => {
  const [type, value] = line.split(" ");

  return { type: type as Operation["type"], value: parseInt(value) };
});

let currentRegister = 1;
let currentCycle = 1;
let answer = "";

const ongoingOperation = { stepsLeft: 0, value: 0 };

while (opeartions.length) {
  if (ongoingOperation.stepsLeft) {
    ongoingOperation.stepsLeft--;
    if (!ongoingOperation.stepsLeft) {
      currentRegister += ongoingOperation.value;
      ongoingOperation.value = 0;
    }
  }

  if (
    currentCycle % 40 < currentRegister ||
    currentCycle % 40 > currentRegister + 2
  ) {
    answer += ".";
  } else {
    answer += "#";
  }

  if (!ongoingOperation.stepsLeft) {
    const operation = opeartions.shift() as Operation;
    if (operation.type === "addx") {
      ongoingOperation.stepsLeft = ADDX_LENGTH;
      ongoingOperation.value = operation.value;
    }
  }

  if (currentCycle % 40 === 0) {
    answer += "\n";
  }

  currentCycle++;
}

const encoder = new TextEncoder();
Deno.writeFile("output.txt", encoder.encode(answer));
