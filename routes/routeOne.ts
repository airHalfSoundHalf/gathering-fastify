const routeOne = async function (fastify, options) {
    fastify.get('/one', async (request, reply) => {
        reply.send('this is route one');
    });
};

export default routeOne;