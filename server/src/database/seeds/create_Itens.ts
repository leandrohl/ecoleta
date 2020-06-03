import Knex from 'knex';

// o seed serve para inserir elementos (popular nosso base dados, com alguns dados padroes)
export async function seed(knex: Knex) {
	await knex('itens').insert([
		{title: 'Lâmpadas', image: 'lampadas.svg'},
		{title: 'Pilhas e baterias', image: 'baterias.svg'},
		{title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
		{title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
		{title: 'Resíduos Orgânicos', image: 'organicos.svg'},
		{title: 'Óleo de Cozinha', image: 'oleo.svg'},
	]);
}