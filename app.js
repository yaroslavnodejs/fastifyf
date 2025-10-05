const fastify = require('fastify')({ logger: true })
const axios = require('axios')

const PXOLLY_API_URL = 'https://api.pxolly.ru/method/users.getRegisteredDate'

fastify.get('/myapi/registration_dates', async (request, reply) => {
  const user_ids = request.query.user_ids
  if (!user_ids) {
    return reply.status(400).send({ error: 'user_ids parameter is required' })
  }

  try {
    const response = await axios.get(PXOLLY_API_URL, {
      params: {
        user_ids: user_ids
      }
    })
    return response.data
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({ error: 'Error from pxolly API' })
  }
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`Server listening on http://localhost:3000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
