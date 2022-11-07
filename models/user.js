const { Schema, model } = require("mongoose");
const Joi = require('joi');
const { handleSaveErrorrs } = require('../helpers')

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlength:6,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    },
    avatarURL: {
        type: String,
        default: ""
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveErrorrs);

const User = model("user", userSchema);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string()
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid ( "starter", "pro", "business" ).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema
}

module.exports = {
    User,
    schemas,
};