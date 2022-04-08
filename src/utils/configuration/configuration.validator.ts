import { default as Joi, ObjectSchema } from 'joi';

export const ConfigurationSchema: ObjectSchema = Joi.object({
    NODE_ENV: Joi.string().valid('local-dev', 'local-test', 'dev', 'staging', 'production'),
    DATABASE__DIALECT: Joi.string().valid('postgresql').required(),
    DATABASE__USERNAME: Joi.string().required(),
    DATABASE__PASSWORD: Joi.string().required(),
    DATABASE__HOST: Joi.string().required(),
    DATABASE__PORT: Joi.number().required().default(5432),
    DATABASE__NAME: Joi.string().required(),
});
