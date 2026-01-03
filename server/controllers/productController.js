const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const { name, company, color, size, cp, sp, stock, minThreshold } = req.body;
        const newProduct = new Product({ name, company, color, size, cp, sp, stock, minThreshold });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Low Stock Products (Admin or Dashboard)
exports.getLowStockProducts = async (req, res) => {
    try {
        // Determine low stock: stock <= minThreshold
        // We can filter in DB using $expr if needed, or simple query if standard
        // But minThreshold is per document. So we use $where or $expr
        const products = await Product.find({
            $expr: { $lte: ["$stock", "$minThreshold"] }
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
