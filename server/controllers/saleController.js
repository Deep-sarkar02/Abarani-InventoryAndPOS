const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Create New Sale
exports.createSale = async (req, res) => {
    try {
        const { productId, quantity, paymentMethod } = req.body;

        // Find Product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Check Stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${product.stock}` });
        }

        // Calculate Financials
        const totalAmount = product.sp * quantity;
        const profit = (product.sp - product.cp) * quantity;

        // Create Sale Record
        const newSale = new Sale({
            product: productId,
            quantity,
            cp: product.cp,
            sp: product.sp,
            paymentMethod, // 'cash' or 'online'
            totalAmount,
            profit,
            soldBy: req.user.id
        });

        // Update Product Stock
        product.stock -= quantity;
        await product.save();

        await newSale.save();

        res.status(201).json(newSale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Monthly Sales & Profit (Admin Report)
exports.getMonthlyStats = async (req, res) => {
    try {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const sales = await Sale.find({
            createdAt: { $gte: firstDay, $lte: lastDay }
        }).populate('product', 'name');

        let totalSales = 0;
        let totalProfit = 0;
        let cashSales = 0;
        let onlineSales = 0;

        sales.forEach(sale => {
            totalSales += sale.totalAmount;
            totalProfit += sale.profit;
            if (sale.paymentMethod === 'cash') cashSales += sale.totalAmount;
            else onlineSales += sale.totalAmount;
        });

        res.json({
            month: date.toLocaleString('default', { month: 'long' }),
            totalSales,
            totalProfit,
            cashSales,
            onlineSales,
            salesCount: sales.length,
            sales // Optional: return detailed list
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
