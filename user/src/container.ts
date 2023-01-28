import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { UserRepository } from './domain/repository/user-repository'

import { UserController } from './exposition/user-controller'
import { HTTPRouter } from './exposition/http-router'
import { Server, IServer } from './exposition/server'


import { UserService } from './application/user-service'

import { UserDatabaseRepository } from './infrastructure/repository/user-database-repository'

const container = new Container()

container.bind(TYPES.UserController).to(UserController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()


container.bind(TYPES.UserService).to(UserService)

container.bind<UserRepository>(TYPES.UserRepository).to(UserDatabaseRepository)

export { container }