import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController {
	async index (request: Request, response: Response) { //vai executar uma funcao assim que usuario acessar esta rota (link)
		const items = await knex('itens').select('*');
	
		const serializedItems = items.map(item => {
			return {
				id: item.id,
				title: item.title,
				image_url: `http://192.168.0.104:3333/uploads/${item.image}`,
			};
		}) //transformar os dados para um novo formato mais acessivel para quem esta fazendo a requisicao
	
		return response.json(serializedItems);
	}
}

export default ItemsController;