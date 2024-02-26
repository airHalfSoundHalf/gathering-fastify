import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// @ts-ignore
import got from 'got'
import { IncomingHttpHeaders } from "http2";

type ProxyRequest = {
    target: string;
} & FastifyRequest

const ACCESS_TOKEN = 'test'

export async function Init(fastify: FastifyInstance) {
    fastify.get('/api/proxy', async (request, reply: FastifyReply) => {
        const { target } = request.query as ProxyRequest;
        const url: URL = new URL(target);

        try {
            const response = await got(url).text();
            console.log('response:', response)
            reply.status(200).send(response);
        } catch (error) {
            console.error('error:', error);
            reply.status(500).send('error');
        }
    });

    fastify.post('/api/proxy', async (request, reply: FastifyReply) => {
        const { target } = request.query as ProxyRequest;

        const url = new URL(target);
        console.log('Request URL:', url);
        const options = {
            headers: {
                ...request.headers,
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            } as IncomingHttpHeaders
        }

        const modifyQuery = {
            searchParams: {
                ...request.query as ProxyRequest,
                testParams: '11'
            }
        }

        try {
            const response = await got(url, {
                ...options,
                searchParams: modifyQuery.searchParams,
            }).text()
            console.log('response:', response)
            reply.status(200).send(response)
        } catch (error) {
            console.error('error:', error)
            reply.status(500).send('error')
        }
    });

    // 리다이렉트
    fastify.get('/api/test*', async (request, reply) => {
        if(request.url.startsWith('/api/test')) {
            reply.redirect('/api')
            return
        }
    });
}
