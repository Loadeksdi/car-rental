import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { OfferRepository } from './domain/repository/offer-repository'

import { OfferController } from './exposition/offer-controller'
import { HTTPRouter } from './exposition/http-router'
import { Server, IServer } from './exposition/server'


import { OfferService } from './application/offer-service'

import { OfferDatabaseRepository } from './infrastructure/repository/offer-database-repository'

const container = new Container()

container.bind(TYPES.OfferController).to(OfferController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()


container.bind(TYPES.OfferService).to(OfferService)

container.bind<OfferRepository>(TYPES.OfferRepository).to(OfferDatabaseRepository)

export { container }