import { FastifyInstance } from 'fastify';
import { ProxyInit } from './proxy';
// import { DBConnect } from './connect';

export async function Routes(fastify: FastifyInstance) {
    fastify.register(ProxyInit)
}
