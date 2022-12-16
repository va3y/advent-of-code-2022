const input = await Deno.readTextFile("test.txt");

// "x-y"
const coveredSquares = new Set<string>();

const sensors = input.split("\n").map((str) => {
  const removeJunk = str.replace("Sensor at ", "").replace(
    ": closest beacon is at ",
    "",
  ).replaceAll(",", "").replaceAll("x=", " ").replaceAll("y=", " ").split(" ")
    .filter((val) => val).map((num) => parseInt(num));

  return {
    sensorX: removeJunk[0],
    sensorY: removeJunk[1],
    beaconX: removeJunk[2],
    beaconY: removeJunk[3],
  };
});

for (
  const sensor of sensors
) {
  let d = 1;

  whileLoop:
  while (true) {
    // [-2, 0] -> [-1,1][-1, -1] -> [0,2][0,-2] -> [1,1][1,-1] -> [2,0]
    for (let i = -d; i <= d; i++) {
      // 1
      coveredSquares.add(
        `${sensor.sensorX + i}-${sensor.sensorY + Math.abs(i) - d}`,
      );
      coveredSquares.add(
        `${sensor.sensorX + i}-${sensor.sensorY - Math.abs(i) - d}`,
      );

      console.log(
        sensor.sensorY + Math.abs(d - i),
        "<->",
        sensor.sensorY - Math.abs(i) + d,
      );
      if (
        sensor.sensorX + i === sensor.beaconX &&
        sensor.sensorY === sensor.beaconY
      ) {
        break whileLoop;
      }
    }
    d++;
  }
}

console.log(sensors);
