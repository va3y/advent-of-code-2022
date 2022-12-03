enum Hand {
	Rock = "rock",
	Paper = "paper",
	Scicors = "sc",
}

const text = await Deno.readTextFile("input.txt");

console.log(
	text
		.split("\n")
		.map((game) => getScoreFromGame(game))
		.reduce((acc, curr) => acc + curr)
);

function getScoreFromGame(game: string) {
	const opponentPlay = {
		A: Hand.Rock,
		B: Hand.Paper,
		C: Hand.Scicors,
	}[game[0]];

	const myPlay = {
		X: Hand.Rock,
		Y: Hand.Paper,
		Z: Hand.Scicors,
	}[game[2]];

	if (!opponentPlay || !myPlay) {
		return 0;
	}

	const winnerScore = {
		[Hand.Paper]: {
			[Hand.Paper]: 3,
			[Hand.Rock]: 0,
			[Hand.Scicors]: 6,
		},
		[Hand.Rock]: {
			[Hand.Paper]: 6,
			[Hand.Rock]: 3,
			[Hand.Scicors]: 0,
		},
		[Hand.Scicors]: {
			[Hand.Paper]: 0,
			[Hand.Rock]: 6,
			[Hand.Scicors]: 3,
		},
	}[opponentPlay][myPlay];

	const playScore = {
		[Hand.Paper]: 2,
		[Hand.Rock]: 1,
		[Hand.Scicors]: 3,
	}[myPlay];

	return winnerScore + playScore;
}
