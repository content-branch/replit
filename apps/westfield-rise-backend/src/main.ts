import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import csurf from 'csurf';
import winston from 'winston';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { URL } from 'url';

import ecrmRoutes from './routes/ecrm.route';
import {
  createContactHandler,
  createDoubleOptInContactHandler,
} from '@westfield-rise/westfield-rise-backend-handlers';
import {
  CREATE_CONTACT_COMMAND,
  CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND, Mediator as mediator
} from '@westfield-rise/westfield-rise-backend-utils';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Westfield Rise Backend API',
      version: '1.0.0',
    },
  },
  apis: ['./apps/westfield-rise-backend/**/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

const app = express();

// Security: Helmet for basic security headers
app.use(helmet());

app.use((req, res, next) => {
  const allowedOriginsWithoutProtocol = process.env.ALLOWED_ORIGINS.split(
    ',',
  ).map(origin => {
    return getOriginWithPort(origin);
  });
  const hostOriginWithoutProtocol = `${req.get('host')}`;

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const originWithoutProtocol = getOriginWithPort(origin);

      if (
        allowedOriginsWithoutProtocol.length === 0 ||
        allowedOriginsWithoutProtocol.includes(originWithoutProtocol) ||
        originWithoutProtocol === hostOriginWithoutProtocol
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  cors(corsOptions)(req, res, next);
});

mediator.registerHandler(CREATE_CONTACT_COMMAND, createContactHandler);
mediator.registerHandler(
  CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND,
  createDoubleOptInContactHandler,
);
// Now, when you call `mediator.send` with a command object that has the type CREATE_CONTACT_COMMAND,
// it will execute the createContactHandler function

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', ecrmRoutes);

// Error Handling: Centralized error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  winston.error(`An error occurred: ${err.message}`);
  res.status(500).send('An error occurred');
});

// Security: Enable CSRF protection
app.use(csurf());

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
server.on('error', console.error);

function getOriginWithPort(origin: string): string {
  const url = new URL(origin);
  return `${url.hostname}${url.port ? ':' + url.port : ''}`;
}
