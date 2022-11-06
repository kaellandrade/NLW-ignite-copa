import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";
import ShortUniqueId from "short-unique-id";
import {authenticate} from "../plugin/authenticate";

/**
 * Rotas para o bolão.
 * @param fastify
 */
export async function pollRoutes(fastify: FastifyInstance) {
	/**
	 * Rota para contabilizar bolões.
	 */
	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count();
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

		try {
			await request.jwtVerify();
			await prisma.pool.create({
				data: {
					title,
					code,
					ownerId: request.user.sub,
					participants: {
						create: {
							userId: request.user.sub
						}
					}
				}
			});
		} catch (e) {
			console.log(e);
			await prisma.pool.create({
				data: {
					title,
					code
				}
			});
		}


		response.status(201).send({code});
	});

	/**
	 * Rota para participar de um bolão.
	 */
	fastify.post('/pools/join', {
		onRequest: [authenticate]
	}, async (request, response) => {
		const joinPoolBody = z.object({
			code: z.string()
		});
		const {code} = joinPoolBody.parse(request.body);

		const pool = await prisma.pool.findUnique({
			where: {
				code,
			},
			include: {
				participants: {
					where: {
						userId: request.user.sub
					}
				}
			}
		});
		if (!pool) {
			return response.status(400).send({
				message: 'Bolão não encontrado'
			});
		}
		if (pool.participants.length > 0) {
			return response.status(400).send({
				message: 'Você já faz parte desse bolão!'
			});
		}

		// Caso bolão não tenha dono o primeiro entrar é o dono.
		if (!pool.ownerId) {
			await prisma.pool.update({
				where: {
					id: pool.id
				},
				data: {
					ownerId: request.user.sub
				}
			});
		}

		await prisma.participant.create({
			data: {
				poolId: pool.id,
				userId: request.user.sub
			}
		});
		return response.status(201).send();

	});

	/**
	 * Rota para listar todos os bolões.
	 */
	fastify.get('/pools', {onRequest: [authenticate]}, async (request) => {
		const polls = await prisma.pool.findMany({
			where: {
				participants: {
					some: {userId: request.user.sub}
				},
			},
			include: {
				_count: {
					select: {
						participants: true
					}
				},
				owner: {
					select: {
						name: true,
						id: true
					}
				},
				participants: {
					select: {
						id: true,
						user: {
							select: {
								avatarUrl: true
							}
						}
					},
					take: 4
				}
			}
		});
		return {polls}
	});

	fastify.get('/pools/:id', {
		onRequest: [authenticate]
	}, async (request) => {
		const getPoolParams = z.object({
			id: z.string()
		});
		const {id} = getPoolParams.parse(request.params);
		const pool = await prisma.pool.findUnique({
			where: {
				id
			},
			include: {
				_count: {
					select: {
						participants: true
					}
				},
				owner: {
					select: {
						name: true,
						id: true
					}
				},
				participants: {
					select: {
						id: true,
						user: {
							select: {
								avatarUrl: true
							}
						}
					},
					take: 4
				}
			}
		});
		return {pool};
	})
}
