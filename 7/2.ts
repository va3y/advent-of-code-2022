class Directory {
	public parentDirectory: Directory | null = null;
	public childDirectories: Directory[] = [];
	public filesizeOfCurrentDirectory = 0;
	public size = 0;

	constructor(public name: string) {}
}

enum Commands {
	ls = "ls",
	cd = "cd",
}

const input = await Deno.readTextFile("input.txt");

const commands = input.split("$ ").map((commandChunk) => {
	const [commandLine, ...lines] = commandChunk.split("\n");

	const [type, target] = commandLine.split(" ");

	const directories: string[] = [];
	let filesizeOfCurrentDirectory = 0;

	for (const line of lines) {
		if (!line) continue;
		const [firstToken, secondToken] = line.split(" ");

		if (firstToken === "dir") {
			directories.push(secondToken);
		} else {
			filesizeOfCurrentDirectory += parseInt(firstToken, 10);
		}
	}

	return {
		command: { target, type: type as Commands },
		filesizeOfCurrentDirectory,
		directories,
	};
});

const root = new Directory("/");

let currentDirectory = root;

for (const { command, filesizeOfCurrentDirectory, directories } of commands) {
	if (!command.type || command.target === "/") continue;

	if (command.type === Commands.ls) {
		currentDirectory.childDirectories = directories.map(
			(directoryName) => new Directory(directoryName)
		);
		currentDirectory.filesizeOfCurrentDirectory = filesizeOfCurrentDirectory;

		continue;
	}

	if (command.target === "..") {
		currentDirectory = currentDirectory.parentDirectory as Directory;
	} else {
		const temporaryParent = currentDirectory;

		currentDirectory = currentDirectory.childDirectories.find(
			(directory) => directory.name === command.target
		) as Directory;

		currentDirectory.parentDirectory = temporaryParent;
	}
}

(function calculateInnerFolderSize(directory: Directory): number {
	const size =
		directory.filesizeOfCurrentDirectory +
		directory.childDirectories.reduce(
			(acc, curr) => acc + calculateInnerFolderSize(curr),
			0
		);

	directory.size = size;
	return size;
})(root);

let answer = Infinity;
const target = 30000000 - (70000000 - root.size);

(function traverseForAnswer(directory: Directory) {
	if (directory.size < answer && directory.size >= target)
		answer = directory.size;

	directory.childDirectories.forEach((directory) =>
		traverseForAnswer(directory)
	);
})(root);

console.log(Deno.inspect(root, { depth: 9999 }));
console.log(target, answer);
