import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { BookingRepository } from './domain/repository/booking-repository'
import { BookingController } from './exposition/booking-controller'
import { HTTPRouter } from './exposition/http-router'
import { Server, IServer } from './exposition/server'
import { BookingService } from './application/booking-service'
import { BookingDatabaseRepository } from './infrastructure/repository/booking-database-repository'

const container = new Container()

container.bind(TYPES.BookingController).to(BookingController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()

container.bind(TYPES.BookingService).to(BookingService)

container.bind<BookingRepository>(TYPES.BookingRepository).to(BookingDatabaseRepository)

export { container }