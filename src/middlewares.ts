import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, {type ErrorRequestHandler, type RequestHandler} from 'express';
import helmet from 'helmet';
import {logger} from './logger';
import {microsoftOpenidHelper} from './microsoftOpenidHelper';
import {vars} from './vars';

export const bodyParserMiddleware = (): RequestHandler => {
  return express.json();
};

export const urlParserMiddleware = (): RequestHandler => {
  return express.urlencoded({extended: true});
};

export const cookieParserMiddleware = (): RequestHandler => {
  return cookieParser(vars.app.secret);
};

export const securityMiddleware = (): RequestHandler => {
  return helmet();
};

export const compressionMiddleware = (): RequestHandler => {
  return compression();
};

export const corsMiddleware = (): RequestHandler => {
  return (_req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', vars.middlewares.cors.headers);
    res.setHeader('Access-Control-Allow-Methods', vars.middlewares.cors.methods);
    res.setHeader('Access-Control-Allow-Origin', vars.middlewares.cors.origin);
    next();
  };
};

export const completeUrlMiddleware = (): RequestHandler => {
  return (req, _res, next) => {
    req.completeUrl = `${req.protocol}://${req.get('host')}${req.path}`;
    next();
  };
};

export const authMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    try {
      let accessToken = '';
      if (/Bearer .+/.test(req.headers.authorization!)) {
        accessToken = req.headers.authorization?.split(' ').at(-1) as string;
      } else if (req.headers.cookie) {
        accessToken = req.headers.cookie
          .split('; ')
          .find(cookie => /^access_token=.+/.test(cookie))
          ?.split('=')
          .at(-1) as string;
      }
      await microsoftOpenidHelper.getUserInfo({accessToken});
      next();
    } catch (error) {
      res.redirect('/login');
    }
  };
};

export const errorHandlerMiddleware = (): ErrorRequestHandler => {
  const errors: Record<string, number> = {
    ValidationError: 400,
    ForbiddenError: 403,
  };
  return (err, _req, res, next) => {
    const status = errors[err.name];
    if (status) {
      res.status(status).json({name: err.name, message: err.message});
      logger.warn(err);
    } else {
      res.sendStatus(500);
      logger.error(err);
    }
    next();
  };
};
