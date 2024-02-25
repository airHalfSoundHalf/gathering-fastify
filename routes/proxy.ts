import Fastify from 'fastify';
import proxy from '@fastify/http-proxy'

const server = Fastify();

server.register(proxy, {
    upstream: 'http://my-api.example.com',
    prefix: '/api/proxy',
    http2: false,
});

server.listen({ port: 8080 });