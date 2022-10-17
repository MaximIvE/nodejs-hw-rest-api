const { Schema, model } = require("mongoose")
const {handleSaveErrorrs} = require('../helpers')

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
        match: /^((\(\d{3}\)|\d{3})|\d{5}) \d{3}-\d{4}$/,
        unique: true,
    },

    favorite: {
        type: Boolean,
        default: false,
    }
})

contactSchema.post("save", handleSaveErrorrs)

const Contact = model("contact", contactSchema)

module.exports = Contact;