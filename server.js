import { fastify } from 'fastify';
import { allProducts } from './db.js';

const server = fastify();

server.get('/mugs', async (request, reply) => {
  const search = request.query.search;
  let mugProducts = allProducts.filter((product) => product.category === 'mugs');

  if(search) {
    mugProducts = mugProducts.filter((product) => product.name.includes(search));
  }
  reply.send(mugProducts);
});

server.get('/tshirts', async (request, reply) => {
  const search = request.query.search;
  let shirtProducts = allProducts.filter((product) => product.category === 't-shirts');

  if(search) {
    shirtProducts = shirtProducts.filter((product) => product.name.includes(search));
  }
  reply.send(shirtProducts);
});

server.get("/", async (request, reply) => {
  const search = request.query.search;
  let products = allProducts;

  if (search) {
    products = products.filter((product) => product.name.includes(search));
  }

  reply.send(products);
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
