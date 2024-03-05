import fastify from "fastify";
import http from "http";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { Routes } from './routes'

export const app = fastify<http.Server, http.IncomingMessage>({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

// app.all('/', (request, reply) => {
//     reply.send({ method: request.method, body: request.body });
// });

app.register(Routes);

export default app

