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

type PostRequest = FastifyRequest<{
    Querystring: {
        payload: any
    }
}>;

export async function Post(fastify: FastifyInstance) {
fastify.post('/api/post', opts,  async (request: PostRequest, reply: FastifyReply) => {
    const { payload } = request.query
    // console.log('request.query:', request.query)
    reply.send({
        response: payload
    })
})
}