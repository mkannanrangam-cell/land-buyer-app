const Buyer = require('../models/buyerModel');

class BuyerController {
    // Get all buyers
    async getAllBuyers(req, res) {
        try {
            
            const buyers = await Buyer.getAll();
            res.status(200).json(buyers);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving buyers', error });
        }
    }

    // Get a single buyer by ID
    async getBuyerById(req, res) {
        const { id } = req.params;
        try {
            const buyer = await Buyer.getById(id);
            if (buyer) {
                res.status(200).json(buyer);
            } else {
                res.status(404).json({ message: 'Buyer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving buyer', error });
        }
    }

    // Create a new buyer
    async createBuyer(req, res) {
        const { name, phone, sqft, city, area, pincode, cost } = req.body;
        const created_by = req.user.id;
        try {
            const insertId = await Buyer.create({ name, phone, sqft, city, area, pincode, cost, created_by });
            res.status(201).json({ id: insertId, name, phone, sqft, city, area, pincode, cost, created_by });
        } catch (error) {
            res.status(500).json({ message: 'Error creating buyer', error });
        }
    }

    // Update a buyer
    async updateBuyer(req, res) {
        const { id } = req.params;
        const { name, phone, sqft, city, area, pincode, cost } = req.body;
        try {
            const buyer = await Buyer.getById(id);
            if (buyer) {
                await Buyer.update(id, { name, phone, sqft, city, area, pincode, cost });
                const updatedBuyer = await Buyer.getById(id);
                res.status(200).json(updatedBuyer);
            } else {
                res.status(404).json({ message: 'Buyer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating buyer', error });
        }
    }

    // Delete a buyer
    async deleteBuyer(req, res) {
        const { id } = req.params;
        try {
            const buyer = await Buyer.getById(id);
            if (buyer) {
                await Buyer.remove(id);
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Buyer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting buyer', error });
        }
    }
}

module.exports = new BuyerController();