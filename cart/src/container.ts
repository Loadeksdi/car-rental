import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { CartRepository } from './domain/repository/cart-repository'

import { CartController } from './exposition/cart-controller'
import { HTTPRouter } from './exposition/http-router'
import { Server, IServer } from './exposition/server'


import { CartService } from './application/cart-service'

import { CartMemoryRepository } from './infrastructure/repository/cart-memory-repository'

const container = new Container()

container.bind(TYPES.CartController).to(CartController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()


container.bind(TYPES.CartService).to(CartService)

container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepository)

export { container }