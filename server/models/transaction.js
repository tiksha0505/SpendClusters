const mongoose = require('mongoose');

//blueprint
const TransactionSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clusterId: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);