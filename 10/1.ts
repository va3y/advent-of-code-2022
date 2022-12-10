const ADDX_LENGTH = 2;

const CYCLE_MILESTONES = [20, 60, 100, 140, 180, 220];
let SUM_OF_MILESTONES = 0;

type Operation = { type: "addx"; value: number } | { type: "noop" };

const input = await Deno.readTextFile("input.txt");

const opeartions = input.split("\n").map((line): Operation => {
  const [type, value] = line.split(" ");

  return { type: type as Operation["type"], value: parseInt(value) };
});

let currentRegister = 1;
let currentCycle = 1;

const ongoingOperation = { stepsLeft: 0, value: 0 };

while (opeartions.length) {
  if (ongoingOperation.stepsLeft) {
    ongoingOperation.stepsLeft--;
    if (!ongoingOperation.stepsLeft) {
      currentRegister += ongoingOperation.value;
      ongoingOperation.value = 0;
    }
  }
  if (!ongoingOperation.stepsLeft) {
    const operation = opeartions.shift() as Operation;
    if (operation.type === "addx") {
      ongoingOperation.value = operation.value;
      ongoingOperation.stepsLeft = ADDX_LENGTH;
    }
  }

  // value checking
  if (CYCLE_MILESTONES.includes(currentCycle)) {
    SUM_OF_MILESTONES += currentRegister * currentCycle;
  }

  currentCycle++;
}

console.log(currentRegister, currentCycle, SUM_OF_MILESTONES, ongoingOperation);
