enum Hand {
	Rock = "rock",
	Paper = "paper",
	Scicors = "sc",
}

enum GameOutcome {
	Win = "win",
	Lose = "lose",
	Draw = "draw",
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

	const gameOutcome = {
		X: GameOutcome.Lose,
		Y: GameOutcome.Draw,
		Z: GameOutcome.Win,
	}[game[2]];

	if (!opponentPlay || !gameOutcome) {
		throw new Error("undefined!");
	}

	const myHand = {
		[Hand.Scicors]: {
			[GameOutcome.Win]: 6 + 1,
			[GameOutcome.Draw]: 3 + 3,
			[GameOutcome.Lose]: 0 + 2,
		},
		[Hand.Paper]: {
			[GameOutcome.Win]: 6 + 3,
			[GameOutcome.Draw]: 3 + 2,
			[GameOutcome.Lose]: 0 + 1,
		},
		[Hand.Rock]: {
			[GameOutcome.Win]: 6 + 2,
			[GameOutcome.Draw]: 3 + 1,
			[GameOutcome.Lose]: 0 + 3,
		},
	}[opponentPlay][gameOutcome];

	return myHand;
}
