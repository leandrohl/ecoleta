import knex from 'knex';
import path from 'path';

const connection = knex({
	client: 'sqlite3', //é necessario baixar o pacote sqlite
	connection: { //__dirname: resulta no caminho de onde esta sendo executado este comando
		filename: path.resolve(__dirname, 'database.sqlite'), //une caminhos 
	},
	useNullAsDefault: true,
})

export default connection; 

//MIGRATION = Histórico do banco de dados




