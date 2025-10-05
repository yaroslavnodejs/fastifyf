async function sensible (fastify) {
  fastify.register(require('@fastify/sensible'))
}

module.exports = sensible
