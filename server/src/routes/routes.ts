import Router from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ its: 'Chat??' });
});

export default routes;
