import 'reflect-metadata'
import { TYPES } from './types'
import { container } from './container'
import { IServer } from './exposition/server';

const start = async () => {
    const server = container.get<IServer>(TYPES.Server)
    return server.start()
}

start()
console.log('Listening on http://localhost:3000')
