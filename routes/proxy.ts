import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// @ts-ignore
import got from 'got'
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http2';

type ProxyRequest = {
    target: string;
} & FastifyRequest

const ACCESS_TOKEN = 'test'

export async function ProxyInit(fastify: FastifyInstance) {
    /**
     * @method GET
     * */
    fastify.get('/api/proxy', async (request, reply: FastifyReply) => {
        const { target } = request.query as ProxyRequest;
        const instanceUrl: URL = new URL(target);

        try {
            const response = await got(instanceUrl).text();
            reply.status(200).send(response);
        } catch (error) {
            reply.status(500).send('error');
        }
    });

    /**
     * @method POST
     * */
    fastify.post('/api/proxy', async (request, reply: FastifyReply) => {
        const { target, params } = request.query as ProxyRequest;
        const instanceUrl = new URL(target);

        // 쿼리 파라미터가 있을 시
        if (params) {
            instanceUrl.searchParams.set('params', String('1111'));
            try {
                await got(instanceUrl).then(response => {
                    return reply.status(200).send(response.url)
                }).catch(error => {
                    return reply.status(500).send(error)
                })
            } catch (error) {
                return reply.status(500).send('error')
            }
        }

        try {
            await got(instanceUrl).then(response => {
                return reply.status(200).send(response.url)
            }).catch(error => {
                return reply.status(500).send(error)
            })
        } catch (error) {
            return reply.status(500).send('error')
        }
    });

    /**
     * @method POST
     * @define 토큰 일치 여부
     * */
    fastify.post('/api/proxy/token', async (request, reply: FastifyReply) => {
        const { target } = request.query as ProxyRequest;
        const instanceUrl = new URL(target);

        let customHeaders = {
            ...request.headers,
        } as IncomingHttpHeaders

        if (request.headers.authorization !== `Bearer ${ACCESS_TOKEN}`) {
            return reply.status(403).send('토큰 불일치')
        } else {
            upstreamRequestOptions(request, customHeaders)

            try {
                await got(instanceUrl, {
                    headers: {
                        customHeaders
                    }
                }).then(response => {
                    return reply.status(200).send(response.headers)
                }).catch(error => {
                    return reply.status(500).send(error)
                })
            } catch (error) {
                return reply.status(500).send('error')
            }
        }
    })

    /**
     * @method GET
     * @define 리다이렉트
     * */
    fastify.get('/api/test*', async (request, reply) => {
        if(request.url.startsWith('/api/test')) {
            return reply.redirect('/api')
        }
    });
}

// 업스트림 보낼 옵션
const upstreamRequestOptions = (request: FastifyRequest, headers: any) => {
    headers = {
        ...headers,
        headers: {
            'authorization': `Bearer ${ACCESS_TOKEN}`,
            'host': request.headers.host,
            'x-forwarded-host': request.headers['x-forwarded-host'],
            'connection': request.headers.connection,
        } as OutgoingHttpHeaders
    };

    return headers
}