const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort();
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);

    if(error) {
        return res.status(400).send(error.message);
    }

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })

    customer = await customer.save();
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.find({_id: req.params.id});
    if(!customer) res.status(404).send("Customer not found")
    res.send(customer)
})

router.put('/:id', auth, async (req, res) => {

    const { error } = validate(req.body);

    if(error) {
        return res.status(400).send('Name is required and should be minimum 5 characters');
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if(!customer) res.status(404).send("Customer not found")

    res.send(customer);
})

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.deleteOne({_id: req.params.id});

    if(!customer) res.status(404).send('The customer with the given ID was not found')
    
    res.send(customer); 
})

module.exports = router;