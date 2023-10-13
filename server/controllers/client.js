const Client = require('../model/client');

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get the count of clients
exports.getClientCount = async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
    console.log(req.body)
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.json(savedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a client by ID
exports.editClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndRemove(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(deletedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
