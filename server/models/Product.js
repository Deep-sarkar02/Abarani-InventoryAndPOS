const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    cp: { type: Number, required: true }, // Cost Price
    sp: { type: Number, required: true }, // Selling Price
    stock: { type: Number, required: true, default: 0 },
    minThreshold: { type: Number, required: true, default: 5 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
