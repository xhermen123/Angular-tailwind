// @ts-nocheck
/**
 * @fileoverview Backend Server for Angular App
 */

const config = require('config');
const express = require('express');
const session = require('express-session');
const expressWinston = require('express-winston');
const { resolve } = require('path');
const { authHelpers } = require('@two-hat-engineering/shared-libs-node');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const superagent = require('superagent');
const { get } = require('lodash');

const app = express();
app.set('trust proxy', 1);
// TODO @shane.lawrence See if logger throwing errors was a transient thing or if I broke something somewhere
const logger = console;// loggingHelpers.install('rule-audit-app');

let redisParams = {};

if (config.has('db.redis.connectionString')) {
  redisParams = { url: config.get('db.redis.connectionString') };

} else if (config.has('db.redis')) {
  /** @deprecated */
  redisParams = { ...config.get('db.redis') };

} else if (config.has('redis')) {
  /** @deprecated */
  redisParams = {
    host: config.get('db.redis.host'),
    port: config.get('db.redis.port'),
    auth_pass: config.get('db.redis.password')
  }
}

redisParams.db = 2;

const redisClient = redis.createClient(redisParams);

redisClient.on('ready', logger.info);
redisClient.on('connect', logger.info);
redisClient.on('disconnect', logger.warn);
redisClient.on('end', logger.warn);

const csp = config
  .get('contentSecurityPolicy')
  .replace('${ENVIRONMENT}', process.env.NODE_ENV)
  .trim();

// Apply Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy-Report-Only', csp);
  next();
})

app.set('view engine', 'html');
app.set('views', resolve(__dirname, 'dist', 'rule-audit-app'));

app.use(expressWinston.logger({ winstonInstance: logger }));

// Auth
authHelpers.install(app, {
  audience: config.get('sso.audience'),
  issuer: (() => {

    // Test the URL to see if it's a GitLab Review App
    const reviewAppUrlRegExp = /^https?:\/\/(\d{7,10}-(\w{4}-\w{3}-)?review-.*)$/;

    // If this is a review app, use its hostname as the issuer
    if (
      'GITLAB_ENVIRONMENT_URL' in process.env
      && reviewAppUrlRegExp.test(process.env.GITLAB_ENVIRONMENT_URL)
    ) {
      return process.env.GITLAB_ENVIRONMENT_URL.replace(reviewAppUrlRegExp, '$1');
    }

    // Try returning the issuer from the SSO config
    if (config.has('sso.issuer')) return config.get('sso.issuer');
    
    // Otherwise, return localhost:port
    return `localhost:${config.get('port')}`

  })(),
  signingKey: config.get('sso.signingKey'),
  loginUrl: config.get('sso.loginUrl'),
  logoutUrl: config.get('sso.logoutUrl'),
  validateUrl: config.get('sso.validateUrl'),
  privateUrl: config.get('sso.privateUrl'),
  unprotectedPaths: [
    '/status',
    '/api/v1/status'
  ],
  sessionStore: session({
    store: new RedisStore({
      ttl: 60 * 60,
      client: redisClient
    }),
    secret: config.get('session.secret'),
    resave: false,
    rolling: true,
    saveUninitialized: false,
    unset: 'destroy'
  }),
  logger
});

app.use(express.static(resolve(__dirname, 'dist')));

app.all('/api/*', express.json({}), (req, res, next) => {
  
  // Proxy to Rules API backend
  if (req.path.startsWith('/api/v1/rules/')) {
    // Rules API uses a v2 path
    const v2path = req.path.replace(/api\/v1/, 'api/v2');
    return proxyToBackend(config.get('sift.rulesApi.url'), req, res, v2path);
  }

  // Relay all API requests to the Rules Audit server
  try {
    
    proxyToBackend(config.get('sift.rulesAudit.url'), req, res);

  } catch (error) {
    return next(error);
  }

});

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

app.use((error, req, res, next) => { // eslint-disable-line
  console.error(error); // eslint-disable-line
  return res
    .status(get(error, 'response.status', 500))
    .json({
      error: get(error, 'response.data.message', error.message)
    });
})

module.exports = app;

/////

async function proxyToBackend (apiBaseUrl, req, res, path) {

  const headers = { ...req.headers };
  headers.authorization = `Bearer ${req.user.apiKey || config.get('sift.rulesAudit.debugApiKey')}`;
  headers['cache-control'] = 'no-store';
  headers['host'] = new URL(apiBaseUrl).host;
  delete headers.cookie;

  const targetUrl = `${apiBaseUrl}${path || req.path}`;

  superagent(
    req.method,
    targetUrl,
  )
    .buffer(true)
    .query(req.query)
    .send(req.body)
    .set(headers)
    .end((err, response) => {
      if (err) {
        const body = get(err, 'response.body', { error: err.message });
        const status = get(err, 'response.status', (err.status || 500));
        return res.status(status).json(body);
      }
      res.status(response.status).json(response.body);
    });

}