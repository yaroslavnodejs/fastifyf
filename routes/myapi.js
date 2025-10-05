const axios = require('axios')

const PXOLLY_API_URL = 'https://api.pxolly.ru/method/users.getRegisteredDate'

async function routes (fastify) {
  fastify.get('/myapi/registration_dates', async (request, reply) => {
    const user_ids = request.query.user_ids
    if (!user_ids) {
      return reply.status(400).send({ error: 'user_ids parameter is required' })
    }

    try {
      const response = await axios.get(PXOLLY_API_URL, {
        params: { user_ids }
      })
      return response.data
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Error from pxolly API' })
    }
  })
}

module.exports = routes
