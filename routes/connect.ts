export async function DBConnect (fastify, options) {
    const db = fastify.sqlite.db

    function trimTitle(request, repy, done) {
        request.body.title = request.body.title.trim()
        done()
    }
}