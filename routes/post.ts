import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import { Type } from '@sinclair/typebox';

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                response: Type.Number()
            }
        },
        querystring: {
            payload: Type.Any()
        }
    }
}

type PostRequest = {
    payload: any
} & FastifyRequest

export async function Post(fastify: FastifyInstance) {
fastify.post('/api/post', opts,  async (request, reply: FastifyReply) => {
    const { payload } = request.query as PostRequest;
    console.log('payload', payload)
    reply.send({
        response: payload
    })
})
}