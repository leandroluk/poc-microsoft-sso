import express from 'express';
import 'express-async-errors';
import path from 'path';
import {
  bodyParserMiddleware,
  completeUrlMiddleware,
  compressionMiddleware,
  cookieParserMiddleware,
  corsMiddleware,
  errorHandlerMiddleware,
  securityMiddleware,
  urlParserMiddleware,
} from './middlewares';
import {mongoHelper} from './mongoHelper';
import {routes} from './routes';
import {vars} from './vars';

const app = express();

app.use(bodyParserMiddleware());
app.use(urlParserMiddleware());
app.use(corsMiddleware());
app.use(compressionMiddleware());
app.use(securityMiddleware());
app.use(cookieParserMiddleware());
app.use(completeUrlMiddleware());
app.use(routes);
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(errorHandlerMiddleware());

mongoHelper
  .connect()
  .then(() => app.listen(vars.port, () => console.log(`running on port ${vars.port}`)))
  .catch(error => {
    console.log(error);
    process.exit(1); // eslint-disable-line no-process-exit
  });
