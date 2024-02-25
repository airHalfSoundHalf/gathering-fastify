import { FastifyInstance } from 'fastify';
import { Init } from './proxy';
import { Post } from './post';

export async function Routes(fastify: FastifyInstance) {
    fastify.register(Post)
    fastify.register(Init)
}
