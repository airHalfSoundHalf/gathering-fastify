import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NormalPostOpts } from "../schema/post";

type ReqQueryParams = {
    payload: string
} & FastifyRequest

export async function NormalPost(fastify: FastifyInstance) {
fastify.post('/api/post', { ...NormalPostOpts },  async (req, reply: FastifyReply) => {
    const { payload } = req.query as ReqQueryParams;
    console.log('payload', payload)

    reply.send({
        result: payload
    })
})
}