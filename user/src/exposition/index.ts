import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { HTTPRouter } from './http-router';

require('dotenv').config();

const app = new Koa();

const router = new HTTPRouter().get();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(bodyParser());

app.listen(process.env.PORT);