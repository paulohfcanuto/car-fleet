import Joi from 'joi';

const schemaCreate = Joi.object({
    user: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    fleetId: Joi.number().positive().required(),
    password: Joi.string().required(),
});

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export { schemaCreate, schemaLogin };
