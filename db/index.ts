import fastify from "fastify";
import fastifySqlite from "fastify-sqlite";

async function main () {
    const app = fastify()
    app.register(fastifySqlite, {
        dbFile: 'foo.db'
    })
    await app.ready()

    app.all('SELECT * FROM Users', (err, rows) => {
    })
}