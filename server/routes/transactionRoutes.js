const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

//api endpoint for saving an expense
router.post('/', async (req, res) => {
    try {
        const { description, amount } = req.body;
        const newTx = new Transaction({description, amount});
        await newTx.save();
        res.status(201).json(newTx);
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    }
});

// api for fetching
router.get('/', async(req, res) => {
    const data = await Transaction.find();
    res.json(data);
});

module.exports = router;