const database = [];

class Game {
	setPlayer({ socketId, name }: { socketId: string; name: string }) {
		database.push({
			socketId,
			name,
		});
	}

	getPlayers() {
		return database;
	}
}

export const game = new Game();
