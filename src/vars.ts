import packageJson from '../package.json';

const {env: _, cwd} = process;

export const vars = {
  port: Number(_.PORT ?? 3000),
  path: cwd(),
  env: _.NODE_ENV ?? 'development',
  tz: _.TZ ?? 'UTC',
  app: {
    slug: packageJson.name,
    name: packageJson.displayName,
    description: packageJson.description,
    homepage: packageJson.homepage,
    author: packageJson.author,
    servers: (_.APP_SERVERS ?? 'local=http://localhost:3000').split(','),
    secret: _.APP_SECRET ?? 'secret',
    swagger: (_.APP_SWAGGER ?? 'true').toLowerCase() === 'true',
    logFile: _.APP_LOG_FILE, // default undefined, ex: '.tmp/log.json'
  },
  middlewares: {
    cors: {
      headers: _.MIDDLEWARES_CORS_HEADERS ?? '*',
      methods: _.MIDDLEWARES_CORS_METHODS ?? '*',
      origin: _.MIDDLEWARES_CORS_ORIGIN ?? '*',
    },
  },
  mongo: {
    protocol: _.MONGO_PROTOCOL ?? 'mongodb',
    username: _.MONGO_USERNAME ?? 'mongo',
    password: _.MONGO_PASSWORD ?? 'mongo',
    hostname: _.MONGO_HOSTNAME ?? 'localhost',
    port: Number(_.MONGO_PORT ?? 27017),
    database: _.MONGO_DATABASE ?? '_main_',
  },
  microsoft: {
    main: {
      tenantId: _.MICROSOFT_MAIN_TENANT_ID,
      clientId: _.MICROSOFT_MAIN_CLIENT_ID,
      clientSecret: _.MICROSOFT_MAIN_CLIENT_SECRET,
    },
  },
};
