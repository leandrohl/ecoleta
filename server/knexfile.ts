import path from 'path';

module.exports = {
	client: 'sqlite3', //é necessario baixar o pacote sqlite
	connection: { //__dirname: resulta no caminho de onde esta sendo executado este comando
		filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'), //une caminhos 
	},
	migrations: {
		directory: path.resolve(__dirname, 'src', 'database', 'migrations')
	},
	seeds: {
		directory: path.resolve(__dirname, 'src', 'database', 'seeds')
	},
	useNullAsDefault: true,
};