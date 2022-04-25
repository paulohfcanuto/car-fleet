import Joi from 'joi';

const schemaCreate = Joi.object({
    plate: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().positive().required(),
    onRoad: Joi.boolean().required(),
});

const schemaUpdate = Joi.object({
    onRoad: Joi.boolean().required(),
});

export { schemaCreate, schemaUpdate };
