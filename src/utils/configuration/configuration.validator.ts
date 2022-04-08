import { ObjectSchema } from 'joi';
import * as Joi from 'joi';

export const ConfigurationSchema: ObjectSchema = Joi.object({
    NODE_ENV: Joi.string().valid('local-dev', 'local-test', 'dev', 'staging', 'production').required(),
    // http config
    PORT: Joi.number().required(),
    // database
    DATABASE__DIALECT: Joi.string().valid('postgresql').required(),
    DATABASE__USERNAME: Joi.string().required(),
    DATABASE__PASSWORD: Joi.string().required(),
    DATABASE__HOST: Joi.string().required(),
    DATABASE__PORT: Joi.number().optional(),
    DATABASE__NAME: Joi.string().required(),
});
