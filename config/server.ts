export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  logger: {
    level: env("STRAPI_LOG_LEVEL", "info"), // debug, info, warn, error
    exposeInContext: true,
    requests: true, // Log HTTP requests
  },
});
