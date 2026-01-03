const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    cp: { type: Number, required: true }, // Captured at time of sale
    sp: { type: Number, required: true }, // Captured at time of sale
    paymentMethod: { type: String, enum: ['cash', 'online'], required: true },
    totalAmount: { type: Number, required: true },
    profit: { type: Number, required: true },
    soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
