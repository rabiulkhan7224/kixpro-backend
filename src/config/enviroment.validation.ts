import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  // Required only in production; optional in development where individual fields are used
  DATABASE_URL: Joi.when('NODE_ENV', {
    is: 'production',
    then: Joi.string().uri().required(),
    otherwise: Joi.string().optional(),
  }),

  // Required in development; optional in production (DATABASE_URL is used instead)
  DATABASE_HOST: Joi.when('NODE_ENV', {
    is: 'development',
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USER: Joi.when('NODE_ENV', {
    is: 'development',
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  DATABASE_PASSWORD: Joi.when('NODE_ENV', {
    is: 'development',
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  DATABASE_NAME: Joi.when('NODE_ENV', {
    is: 'development',
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});
