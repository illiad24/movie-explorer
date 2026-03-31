import 'dotenv/config';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema.js';

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';

const yoga = createYoga({
  schema,
  cors: false,
  graphqlEndpoint: '/graphql',
});

function setCorsHeaders(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  yoga(req, res);
});

const port = process.env.PORT ?? 4000;

server.listen(port, () => {
  console.log(`BFF running at http://localhost:${port}/graphql`);
});
