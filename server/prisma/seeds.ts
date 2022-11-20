import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
	// FASE DE GRUPO 20 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-20T16:00:00.201Z',
			firstTeamCountryCode: 'QA',
			secondTeamCountryCode: 'EC',
		},
	});


	// 	// FASE DE GRUPO 21 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-21T11:00:00.201Z',
			firstTeamCountryCode: 'GB',
			secondTeamCountryCode: 'IR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-21T16:00:00.201Z',
			firstTeamCountryCode: 'SN',
			secondTeamCountryCode: 'NL',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-21T19:00:00.201Z',
			firstTeamCountryCode: 'US',
			secondTeamCountryCode: 'GB',
		},
	});

	//	FASE DE GRUPOS 22 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-22T10:00:00.201Z',
			firstTeamCountryCode: 'AR',
			secondTeamCountryCode: 'SA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-22T16:00:00.201Z',
			firstTeamCountryCode: 'MX',
			secondTeamCountryCode: 'PL',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-22T12:00:00.201Z',
			firstTeamCountryCode: 'DK',
			secondTeamCountryCode: 'TN',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-22T19:00:00.201Z',
			firstTeamCountryCode: 'FR',
			secondTeamCountryCode: 'AU',
		},
	});

	// FASE DE GRUPOS 23 / 11 / 2022

	await prisma.game.create({
		data: {
			date: '2022-11-23T10:00:00.201Z',
			firstTeamCountryCode: 'MA',
			secondTeamCountryCode: 'HR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-23T19:00:00.201Z',
			firstTeamCountryCode: 'BE',
			secondTeamCountryCode: 'CA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-23T16:00:00.201Z',
			firstTeamCountryCode: 'ES',
			secondTeamCountryCode: 'CR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-23T13:00:00.201Z',
			firstTeamCountryCode: 'DE',
			secondTeamCountryCode: 'JP',
		},
	});

	// FASE DE GRUPOS 24 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-24T10:00:00.201Z',
			firstTeamCountryCode: 'CH',
			secondTeamCountryCode: 'CM',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-24T13:00:00.201Z',
			firstTeamCountryCode: 'UY',
			secondTeamCountryCode: 'KR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-24T16:00:00.201Z',
			firstTeamCountryCode: 'PT',
			secondTeamCountryCode: 'GH',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-24T19:00:00.201Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'RS',
		},
	});

	// FASE DE GRUPOS 25 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-25T10:00:00.201Z',
			firstTeamCountryCode: 'GB',
			secondTeamCountryCode: 'IR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-25T16:00:00.201Z',
			firstTeamCountryCode: 'NL',
			secondTeamCountryCode: 'EC',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-25T16:00:00.201Z',
			firstTeamCountryCode: 'QA',
			secondTeamCountryCode: 'SN',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-25T19:00:00.201Z',
			firstTeamCountryCode: 'GB',
			secondTeamCountryCode: 'US',
		},
	});

	// FASE DE GRUPOS 26 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-26T10:00:00.201Z',
			firstTeamCountryCode: 'TN',
			secondTeamCountryCode: 'AU',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-26T16:00:00.201Z',
			firstTeamCountryCode: 'FR',
			secondTeamCountryCode: 'DK',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-26T13:00:00.201Z',
			firstTeamCountryCode: 'PL',
			secondTeamCountryCode: 'SA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-26T19:00:00.201Z',
			firstTeamCountryCode: 'AR',
			secondTeamCountryCode: 'MX',
		},
	});

	//	FASE DE GRUPOS 27 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-27T10:00:00.201Z',
			firstTeamCountryCode: 'JP',
			secondTeamCountryCode: 'CR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-27T18:00:00.201Z',
			firstTeamCountryCode: 'HR',
			secondTeamCountryCode: 'CA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-27T13:00:00.201Z',
			firstTeamCountryCode: 'BE',
			secondTeamCountryCode: 'MA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-27T19:00:00.201Z',
			firstTeamCountryCode: 'ES',
			secondTeamCountryCode: 'DE',
		},
	});

	//	FASE DE GRUPOS 28 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-28T10:00:00.201Z',
			firstTeamCountryCode: 'CM',
			secondTeamCountryCode: 'RS',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-28T16:00:00.201Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'CH',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-28T13:00:00.201Z',
			firstTeamCountryCode: 'KR',
			secondTeamCountryCode: 'GH',
		},
	});
	await prisma.game.create({
		data: {
			date: '2022-11-28T19:00:00.201Z',
			firstTeamCountryCode: 'PT',
			secondTeamCountryCode: 'UY',
		},
	});

	//	FASE DE GRUPOS 29 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-29T15:00:00.201Z',
			firstTeamCountryCode: 'EC',
			secondTeamCountryCode: 'SN',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-29T18:00:00.201Z',
			firstTeamCountryCode: 'IR',
			secondTeamCountryCode: 'US',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-29T18:00:00.201Z',
			firstTeamCountryCode: 'IR',
			secondTeamCountryCode: 'US',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-29T15:00:00.201Z',
			firstTeamCountryCode: 'NL',
			secondTeamCountryCode: 'QA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-29T19:00:00.201Z',
			firstTeamCountryCode: 'GB',
			secondTeamCountryCode: 'GB',
		},
	});

	//	FASE DE GRUPOS 30 / 11 / 2022
	await prisma.game.create({
		data: {
			date: '2022-11-30T15:00:00.201Z',
			firstTeamCountryCode: 'TN',
			secondTeamCountryCode: 'FR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-30T19:00:00.201Z',
			firstTeamCountryCode: 'PL',
			secondTeamCountryCode: 'AR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-30T15:00:00.201Z',
			firstTeamCountryCode: 'AU',
			secondTeamCountryCode: 'DK',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-30T19:00:00.201Z',
			firstTeamCountryCode: 'SA',
			secondTeamCountryCode: 'MX',
		},
	});

	//	FASE DE GRUPOS 01 / 12 / 2022
	await prisma.game.create({
		data: {
			date: '2022-12-01T15:00:00.201Z',
			firstTeamCountryCode: 'HR',
			secondTeamCountryCode: 'BE',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-12-01T15:00:00.201Z',
			firstTeamCountryCode: 'CA',
			secondTeamCountryCode: 'MA',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-12-01T19:00:00.201Z',
			firstTeamCountryCode: 'JP',
			secondTeamCountryCode: 'ES',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-12-01T19:00:00.201Z',
			firstTeamCountryCode: 'CR',
			secondTeamCountryCode: 'DE',
		},
	});
	//	FASE DE GRUPOS 01 / 12 / 2022
	await prisma.game.create({
		data: {
			date: '2022-12-02T15:00:00.201Z',
			firstTeamCountryCode: 'KR',
			secondTeamCountryCode: 'PT',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-12-02T19:00:00.201Z',
			firstTeamCountryCode: 'RS',
			secondTeamCountryCode: 'CH',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-12-02T15:00:00.201Z',
			firstTeamCountryCode: 'GH',
			secondTeamCountryCode: 'UY',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-12-02T19:00:00.201Z',
			firstTeamCountryCode: 'CM',
			secondTeamCountryCode: 'BR',
		},
	});

}

main()
