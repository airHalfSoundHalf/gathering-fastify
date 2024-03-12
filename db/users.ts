import fastify from "fastify";
import sqlite3 from "sqlite3";
import { faker } from '@faker-js/faker';

export async function UsersDBConnector() {
    const app = fastify();
    const db = new sqlite3.Database('user.db');

    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    db.serialize(() => {
        db.run(`DELETE FROM Users`);

        for (let i = 0; i < 20; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email();
            const password = faker.internet.password();

            db.run(`
                INSERT INTO Users (firstName, lastName, email, password)
                VALUES (?, ?, ?, ?)
            `, [firstName, lastName, email, password]);
        }
    });

    return app;
}
