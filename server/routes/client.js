const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// GET all clients
router.get('/', catchAsyncErrors(clientController.getAllClients));

// GET the count of clients
router.get('/count', catchAsyncErrors(clientController.getClientCount));

// Create a new client
router.post('/', catchAsyncErrors(clientController.createClient));

// Update a client by ID
router.put('/:id', catchAsyncErrors(clientController.editClient));

// Delete a client by ID
router.delete('/:id', catchAsyncErrors(clientController.deleteClient));

module.exports = router;
