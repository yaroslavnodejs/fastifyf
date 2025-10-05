const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastify = require('fastify')({ logger: true })

// Автозагрузка плагинов из папки plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
})

// Автозагрузка маршрутов из папки routes
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    fastify.log.info('Server listening on http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
