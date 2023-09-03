const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    })
    console.log(schema.validate(customer));
    return schema.validate(customer);
    

}

const Customer = mongoose.model('Customer', customerSchema);

module.exports.Customer = Customer;
exports.validate = validateCustomer;