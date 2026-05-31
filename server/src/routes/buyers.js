const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middleware/authMiddleware');

// All buyer routes require a valid JWT (sets req.user)
router.use(authMiddleware);

// Get all buyers
router.get('/', buyerController.getAllBuyers);

// Get a single buyer by ID
router.get('/:id', buyerController.getBuyerById);

// Create a new buyer
router.post('/', buyerController.createBuyer);

// Update a buyer by ID
router.put('/:id', buyerController.updateBuyer);

// Delete a buyer by ID
router.delete('/:id', buyerController.deleteBuyer);

module.exports = router;