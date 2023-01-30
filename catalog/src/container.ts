import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { CatalogRepository } from './domain/repository/catalog-repository'
import { CatalogController } from './exposition/catalog-controller'
import { HTTPRouter } from './exposition/http-router'
import { Server, IServer } from './exposition/server'
import { CatalogService } from './application/catalog-service'
import { CatalogDatabaseRepository } from './infrastructure/repository/catalog-database-repository'

const container = new Container()

container.bind(TYPES.CatalogController).to(CatalogController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()

container.bind(TYPES.CatalogService).to(CatalogService)

container.bind<CatalogRepository>(TYPES.CatalogRepository).to(CatalogDatabaseRepository)

export { container }