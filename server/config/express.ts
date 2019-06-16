import * as path from 'path';
import * as express from 'express';
import * as httpError  from 'http-errors';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compress from 'compression';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import routes from '../routes/index.route';
import * as config from './config';
import * as passport from './passport';
import * as events from '../../events';

const app = express();
import * as httpServer from 'http';
import * as  socketIO from 'socket.io';
const http = new httpServer.Server(app);
const io = socketIO(http);
import {handleSocket} from '../chat/socket';
const socket_port = 3000;

if (config.env === 'development') {
  app.use(logger('dev'));
}

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
if (config.frontend == 'react') {
  distDir ='../../node_modules/material-dashboard-react/dist'
 } else {
  distDir ='../../dist/' ;
 }

// 
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

console.log(distDir);
 //React server
app.use(express.static(path.join(__dirname, '../../node_modules/material-dashboard-react/dist')))
app.use(/^((?!(api)).)*/, (req, res) => {
res.sendFile(path.join(__dirname, '../../dist/index.html'));
}); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

io.on(events.CONNECT, handleSocket);

http.listen(socket_port, () => {
  console.log('socket is listening on port: ' + socket_port);
});

export default app;