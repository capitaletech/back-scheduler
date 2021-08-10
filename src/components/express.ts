import express, {Express} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

export default () : Express => {
  const app = express();

  // HTTP request logger
  app.use(morgan('dev'));

  // Parse body response in JSON format
  app.use(bodyParser.json());

  return app;
};
