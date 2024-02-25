import app from "./app";

const PORT = 8080

const server = app

server.get('/',async () => {
    return { hello: 'world' };
});

const start = async () => {
    try {
        await server.listen({ port: PORT })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()