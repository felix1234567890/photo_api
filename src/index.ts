import express, { Application } from 'express';
import { resolve } from 'path';
import routes from './routes';
import { connectDb } from './db';

const app: Application = express();
connectDb();
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static(resolve('uploads')));
app.listen(3000);
