import express from 'express'; //a biblioteca é delcarada

const app = express();

app.get('/users', (request, response) => { //vai executar uma funcao assim que usuario acessar esta rota (link)
	console.log('Listagem de usuarios');

	//JSON
	response.json([
		'Diego',
		'Cleiton',
		'Robson',
		'Daniel'
	]);
})

app.listen(3333); //qual porta voce deseja executar

