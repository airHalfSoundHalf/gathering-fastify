import app from "./app";
import {FastifyReply, FastifyRequest} from "fastify";

const PORT = 8080

const server = app

server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
});

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`서버가 ${address} 에서 실행 중`);
});