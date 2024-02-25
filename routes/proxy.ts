import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';

type ProxyRequest = FastifyRequest<{
    Querystring: { payload: any }
}>;

export async function Init(fastify: FastifyInstance) {
    fastify.get('/redirect', async (request: ProxyRequest, reply: FastifyReply) => {
        console.log('request.query.payload:"', request.query.payload)
        const { payload } = request.query
        // const url = new URL()

        return reply.redirect(302, 'https://fastify.dev');
    });

    fastify.get('/a', async (request, reply) => {
        return 'this is a';
    });
}