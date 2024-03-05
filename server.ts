import { Sequelize } from "sequelize";
import app from "./app";
import models from './models/user';


const PORT = 8080;

const server = app;

const sequelize = new Sequelize({
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "database.sqlite3"
});

const user = models(sequelize);

server.get('/', async () => {
    await user.sync();

    const users = await user.findAll();

    return { users };
});

const start = async () => {
    try {
        await server.listen({ port: PORT });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
