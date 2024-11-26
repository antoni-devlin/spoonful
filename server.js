// Import supabase client
import {supabase} from './supabase.js'
// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// All recipes endpoint
fastify.get('/recipes/:slug', async function handler (request, reply) {
  const { slug } = request.params;
  // your code here
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}