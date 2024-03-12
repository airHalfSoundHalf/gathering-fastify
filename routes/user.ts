import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import sqlite3 from 'sqlite3';

import { UserResponseOpts } from "../schema/user";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/**
 * @method GET
 * @define 유저 정보 조회
 * */
export async function UserInfo(fastify: FastifyInstance): Promise<void> {
    fastify.get('/api/users', { ...UserResponseOpts },
        async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const rows: User[] = await queryUsersFromDB()
            reply.status(200).send({ result: rows });
        } catch (error: unknown) {
            reply.status(500).send({ error: 'error' });
        }
    });
}

// DB 연결
async function queryUsersFromDB(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('user.db');

        db.all("SELECT firstName, lastName, email, password FROM Users", [], (err, rows: User[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
        db.close();
    });
}