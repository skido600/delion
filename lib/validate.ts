import joi from "joi";

const Signupschema = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi
    .string()
    .min(6)
    .max(60)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email must be a valid address with .com or .net",
      "string.min": "Email must be at least 6 characters",
      "string.max": "Email must be less than or equal to 60 characters",
      "string.empty": "Email is required",
    }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
      "string.empty": "Password is required",
    }),
});
const Loginschema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email must be a valid address with .com or .net",
      "string.min": "Email must be at least 6 characters",
      "string.max": "Email must be less than or equal to 60 characters",
      "string.empty": "Email is required",
    }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
      "string.empty": "Password is required",
    }),
});

export { Loginschema, Signupschema };
