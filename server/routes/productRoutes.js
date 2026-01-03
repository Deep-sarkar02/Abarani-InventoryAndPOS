const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getLowStockProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getProducts);
router.post('/', protect, createProduct); // Users can also add products? Prompt: "Access: Admin, Users - Features: Add new products". Yes.
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, admin, deleteProduct); // Only admin DELETE usually, prompt doesn't specify DELETE access but usually Admin.
router.get('/low-stock', protect, admin, getLowStockProducts); // Prompt: "Alert must be visible to Admin". Maybe users too? "dashboard... Alert must be visible to Admin". I'll restrict to Admin or both. Let's keep it protect (user/admin) but dashboard is Admin-only reports. Low stock is "Warehouse Module" feature but also "Stock Alert System". "Mark product LOW STOCK... Show alert on dashboard... Alert must be visible to Admin". I will allow All to get low stock for inventory management, but the "Alert" specific to Dashboard might be admin. The API can be open to authenticated users.

module.exports = router;
