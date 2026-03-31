import 'dotenv/config';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema.js';

const yoga = createYoga({
  schema,
  cors: {
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});
const server = createServer(yoga);

const port = process.env.PORT ?? 4000;

server.listen(port, () => {
  console.log(`BFF running at http://localhost:${port}/graphql`);
});
