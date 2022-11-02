import Fastify from "fastify";
import {PrismaClient} from '@prisma/client';
import cors from "@fastify/cors";
import {z} from 'zod';
import ShortUniqueId from "short-unique-id";

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

	/**
	 * Rota para contabilizar palpites.
	 */
	fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count();

		return {count: count}
	});

	/**
	 * Rota para contabilizar usuários.
	 */
	fastify.get('/users/count', async () => {
		const count = await prisma.user.count();

		return {count: count}
	});

	/**
	 * Criando um bolão.
	 */
	fastify.post('/pools', async (request, response) => {
		const createPoolBody = z.object({
			title: z.string()
		})

		const {title} = createPoolBody.parse(request.body);
		const generate = new ShortUniqueId({length: 6});
		const code = String(generate()).toLowerCase();

		await prisma.pool.create({
			data: {
				title,
				code
			}
		})

		response.status(201).send({code});
	});

	await fastify.listen({port: 3333, host: '0.0.0.0'});

}

bootstrap();
