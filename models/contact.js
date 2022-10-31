const { Schema, model } = require("mongoose")
const Joi = require('joi')
const { handleSaveErrorrs } = require('../helpers')

const phoneRegexp = /^((\(\d{3}\)|\d{3})|\d{5}) \d{3}-\d{4}$/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },

    email: {
        type: String,
    },

    phone: {
        type: String,
        match: phoneRegexp,
        unique: true,
    },

    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,    // спеціальний тип днаних для id в цій БД
        ref: 'user',                    // з якої колекції береться id
        required: true,
    }
}, { versionKey: false, timestamps: true })

const schemaAdd = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const schemaUpdate = Joi.object({
    name: Joi.string(),
    email:Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean()
}).min(1)

const schemaUpdateFavorite = Joi.object({
    favorite: Joi.boolean().required().messages({
        'any.required': 'missing field favorite'
    })
})

const schemas = {
    schemaAdd,
    schemaUpdate,
    schemaUpdateFavorite
}

contactSchema.post("save", handleSaveErrorrs)

const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    schemas
};