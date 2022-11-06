import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";
import {authenticate} from "../plugin/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
	/**
	 * Rota para contabilizar palpites.
	 */
	fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count();

		return {count: count}
	});

	fastify.post('/pools/:poolId/games/:gameId/guesses', {onRequest:[authenticate]},
		async (request, response) => {
		const createGuessParams = z.object({
			poolId: z.string(),
			gameId: z.string()
		});
		const createGuessBody = z.object({
			firstTeamPoints: z.number(),
			secondTeamPoints: z.number()
		});
		const {poolId, gameId} = createGuessParams.parse(request.params);
		const {firstTeamPoints, secondTeamPoints} = createGuessBody.parse(request.body);

		const participant = await prisma.participant.findUnique({
			where: {
				userId_poolId: {
					poolId,
					userId: request.user.sub
				}
			}
		});
		if(!participant) {
			return response.status(400).send({
				message:"Você não faz parte desse bolão."
			});
		}

		const guess = await prisma.guess.findUnique({
			where: {
				participantId_gameId: {
					participantId: participant.id,
					gameId
				}
			}
		});
		if(guess) {
			return response.status(400).send({
				message:"Você já registrou seu palpite para esse jogo nesse bolão."
			})
		}

		const game = await prisma.game.findUnique({
			where:{
				id: gameId
			}
		});
		if(!game) {
			return response.status(404).send({
				message:"Jogo não encontrado."
			});
		}
		if(game.date < new Date()) {
			return response.status(400).send({
				message:"A data de palpite já foi encerrada para esse jogo."
			});
		}
		await prisma.guess.create({
			data:{
				gameId,
				participantId: participant.id,
				firstTeamPoints,
				secondTeamPoints
			}
		});
		return response.status(201).send();

	});
}
