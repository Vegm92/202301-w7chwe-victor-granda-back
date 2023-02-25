import Joi from "@hapi/joi";

const registerSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    email: Joi.string().required(),
  }),
};

export default registerSchema;
