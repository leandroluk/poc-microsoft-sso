declare module 'express-async-errors' {}

declare namespace Express {
  export interface Request {
    completeUrl: string
  }
}