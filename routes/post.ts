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

export async function Post(fastify: FastifyInstance) {
fastify.post('/api/post', opts,  async (request, reply: FastifyReply) => {
    console.log('request.query:', request.query)
    reply.send({
    })
})
}