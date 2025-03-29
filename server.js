import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import { describe } from 'node:test'

const server = fastify()

const database = new DatabasePostgres()

// POST http://localhost:3333/videos Rota para criar os vídeos

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.query

    const videos = await database.list(search)

    return videos
})

// PUT Rota para atualizar um vídeo

server.put('/videos/:id', (request) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})