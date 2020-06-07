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
			.select('points.*');

		const serializedPoints = points.map(point => {
			return {
				...point,
				image_url: `http://192.168.0.104:3333/uploads/${point.image}`,
			};
		}); //transformar os dados para um novo formato mais acessivel para quem esta fazendo a requisicao
		
		return response.json(serializedPoints);
	}

	async show(request: Request, response: Response){
		const {id} = request.params;

		const point = await knex('points').where('id', id).first();

		if (!point) {
			return response.status(400).json({ messsage: 'Point not found. '})
		}

		const serializedPoint = {
			...point,
			image_url: `http://192.168.0.104:3333/uploads/${point.image}`,
		};
		
		const items = await knex('itens') //vai trazer os itens do ponto do id
		.join('point_itens', 'itens.id', '=', 'point_itens.item_id')
		.where('point_itens.point_id', id)
		.select('itens.title');

		return response.json({serializedPoint, items});
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
			image: request.file.filename,
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

		const pointItems = items
		.split(',')
		.map((item: string) => Number(item.trim()))
		.map((item_id: number) => {
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