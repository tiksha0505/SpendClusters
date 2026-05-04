const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const kmeans = require('ml-kmeans');

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

// k means clustering logic
router.get('/analyze', async(req, res) => {
    try {
        const txns = await transaction.find();

        if (txns.length < 3) {
            return res.status(400).json({ message: "Add atleast 3 expenses to analyze!"});
        }
    

        // preparing data: kmeans need a 2d array
        const dataML = txns.map(t => [t.amount]);

        // run k means with 3 clusters
        const result = kmeans(dataML, 3);

        //update each transaction with its new cluster ID
        const updatePromises = transaction.map((t, index) => {
            return transaction.findByIdAndUpdate(t._id, {
                clusterID: result.clsuters[index]
            });
        });

        await Promise.all(updatePromises);

        res.json({message: "Analysis complete!", clusters: result.clusters});
    } catch (err) {
        res.status(500).json({error: err.message});
    }

});

module.exports = router;