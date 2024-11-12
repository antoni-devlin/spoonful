// Import supabase client
import {supabase} from './supabase.js'
// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Root route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// All recipes endpoint
fastify.get('/recipes/all', async function handler (request, reply) {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select();
  
    if (error) {
      throw new Error(`Failed to fetch recipes: ${error.message}`);
    }
  
    return recipes;
  } catch (err) {
    console.error('Error fetching recipes:', err);
    throw err; // or return a custom error object
  }
})

// Search recipes endpoint
fastify.post('/recipes/search', async function handler (request, reply) {
  const { title } = request.body;

  if (!title) {
    reply.status(400).send({ error: 'Title is required' });
    return;
  }

  try {
    const { data: search_results, error } = await supabase
      .from('recipes')
      .select()
      .ilike('title', `%${title}%`);

    if (error) {
      throw new Error(`An error occured: ${error.message}`);
    }

    return search_results;
  } catch (err) {
    console.error('Error searching recipes:', err);
    reply.status(500).send({ error: 'Failed to search recipes' });
  }
});

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}