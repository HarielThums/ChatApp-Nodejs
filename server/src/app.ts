import routes from './routes/routes';
import express from 'express';
import cors from 'cors';

// Config
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export default app;
