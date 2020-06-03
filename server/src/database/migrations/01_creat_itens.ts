import Knex from 'knex';

export async function up(knex: Knex) {
	return knex.schema.createTable('itens', table => {
		table.increments('id').primary() //o ID
		table.string('image').notNullable(); //notNullable(): nao pode ser vazio
		table.string('title').notNullable();

	})
	//criar tabela
} 


export async function down(knex: Knex){ 
	//voltar atrás (Deletar a tabela)
	return knex.schema.dropTable('itens');
}