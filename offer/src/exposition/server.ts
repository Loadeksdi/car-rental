import { injectable, inject } from 'inversify'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { TYPES } from '../types'
import { HTTPRouter } from './http-router'

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

    app.listen(3003)
  }
}