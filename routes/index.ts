import { FastifyInstance } from 'fastify';

import { ProxyInit } from './proxy';
import { NormalPost } from "./post";
import { UsersDBConnector } from '../db/users';
import { UserInfo } from "./user";

export async function Routes(fastify: FastifyInstance) {
    fastify.register(ProxyInit)
    fastify.register(NormalPost)
    fastify.register(UsersDBConnector)
    fastify.register(UserInfo)
}
