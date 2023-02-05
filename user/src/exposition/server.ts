import { injectable, inject } from 'inversify'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { TYPES } from '../types'
import { HTTPRouter } from './http-router'
import dotenv from 'dotenv'
dotenv.config()
export interface IServer {
  start(): void
}

@injectable()
export class Server {
  @inject(TYPES.HTTPRouter) private _router!: HTTPRouter

  start(): void {
    const router = this._router.get()

    const app = new Koa()

    app.use(bodyParser())

    app.use(router.routes())
    app.use(router.allowedMethods());

    app.listen(process.env.PORT)
  }
}