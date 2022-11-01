import Fastify from "fastify";
import {PrismaClient} from '@prisma/client';
import cors from "@fastify/cors";

const prisma = new PrismaClient({
	log: ['query']
})

/**
 * Configurando as rotas.
 */
async function bootstrap() {
	const fastify = Fastify({
		logger: true,
	});

	await fastify.register(cors, {
		origin: true
	});

	/**
	 * Rota para contabilizar bolões.
	 */
	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count();

		return {count: count}
	});
	await fastify.listen({port: 3333, host: '0.0.0.0'});

}

bootstrap();
