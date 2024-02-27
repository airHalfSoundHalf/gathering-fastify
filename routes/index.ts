import { FastifyInstance } from 'fastify';
import { ProxyInit } from './proxy';

export async function Routes(fastify: FastifyInstance) {
    fastify.register(ProxyInit)
}
