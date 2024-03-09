import fastify from "fastify";
import fastifySqlite from "fastify-sqlite";

export async function DBConnector () {
    const app = fastify()
    app.register(fastifySqlite, {
        dbFile: 'foo.db'
    })
    await app.ready()

    app.all('SELECT * FROM Users', (err, rows) => {
    })
}

export async function DBConnect (fastify, options) {
    const db = fastify.sqlite.db

    function trimTitle(request, repy, done) {
        request.body.title = request.body.title.trim()
        done()
    }
}