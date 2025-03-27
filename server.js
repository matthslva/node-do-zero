import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { describe } from 'node:test'

const server = fastify()

const database = new DatabaseMemory()

// POST http://localhost:3333/videos Rota para criar os vídeos

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request, reply) => {
    const videos = database.list()

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

server.delete('/videos/:id', () => {
    return 'Hello World'
})

server.listen({
    port: 3333,
})