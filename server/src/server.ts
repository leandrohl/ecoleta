import express from 'express'; //a biblioteca é declarada
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json()); //coloca uma funcionalidade a mais no express - faz com que o express entenda o corpo json
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333); //qual porta voce deseja executar

