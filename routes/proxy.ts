import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

type ProxyRequest = FastifyRequest<{
    Querystring: {
        target: string;
        path?: string;
    }
}>;

export async function Init(fastify: FastifyInstance) {
    fastify.get('/api/proxy', async (request: ProxyRequest, reply: FastifyReply) => {
        const { target, path } = request.query;
        const url = new URL(`${target}${path ?? ''}`);

        try {
            const ky = await import('ky');

            const response = await ky.default.get(url.toString()).text();
            reply.status(200).send(response);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ message: 'error' });
        }
    });

    fastify.get('/a', async (request, reply) => {
        return 'this is a';
    });
}
