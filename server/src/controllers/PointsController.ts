import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{ 
	async index(request: Request, response: Response){
		//cidade, uf, items (Query Params)
		const {city, uf, items} = request.query;

		const parsedItems = String(items)
		.split(',')
		.map(item => Number(item.trim()));

		const points = await knex('points')
			.join('point_itens', 'points.id', '=', 'point_itens.point_id')
			.whereIn("point_itens.item_id", parsedItems)
			.where('city', String(city))
			.where('uf', String(uf))
			.distinct()
			.select('points.*')

		return response.json(points);
	}

	async show(request: Request, response: Response){
		const {id} = request.params;

		const point = await knex('points').where('id', id).first();

		if (!point) {
			return response.status(400).json({ messsage: 'Point not found. '})
		}
		
		const items = await knex('itens') //vai trazer os itens do ponto do id
		.join('point_itens', 'itens.id', '=', 'point_itens.item_id')
		.where('point_itens.point_id', id)
		.select('itens.title');

		return response.json({point, items});
	}

	async create(request: Request, response: Response){
		const{
			name,
			email, 
			whatsapp,
			latitude,
			longitude, 
			city, 
			uf, 
			items
		} = request.body;
	
		const trx = await knex.transaction()

		const point = {
			name,
			email, 
			whatsapp,
			latitude,
			longitude, 
			city, 
			uf, 
		}
		const insertedIds = await trx('points').insert({
			image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
			// https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60
			name,
			email, 
			whatsapp,
			latitude,
			longitude, 
			city, 
			uf
		});

		const point_id = insertedIds[0];

		const pointItems = items.map((item_id: number) => {
			return {
				item_id,  //item que é possivel FAZER COLETA
				point_id, //trazer o id do novo point criado
			}
		})
		await trx('point_itens').insert(pointItems);
		
		await trx.commit();

		return response.json({
			id: point_id,
			...point,
		});
	}
}

export default PointsController;