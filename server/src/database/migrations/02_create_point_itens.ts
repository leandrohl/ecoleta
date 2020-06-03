import Knex from 'knex';

export async function up(knex: Knex) {
	return knex.schema.createTable('point_itens', table => {
		table.increments('id').primary() //o ID
		table.integer('point_id')
			.notNullable() //nao pode ser nule
			.references('id') //tem que sem um id presente na entidade points
			.inTable('points');
		table.integer('item_id')
			.notNullable()
			.references('id')
			.inTable('itens');
	})
	//criar tabela
} 


export async function down(knex: Knex){ 
	//voltar atrás (Deletar a tabela)
	return knex.schema.dropTable('point_itens');
}