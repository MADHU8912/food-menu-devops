const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const Restaurant = require('./models/Restaurant');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
connectDB();

// test route
app.get('/', (req, res) => {
  res.send('Backend running');
});

// GET all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD restaurant (admin)
app.post('/api/admin/restaurants', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();

    res.json({
      message: 'Restaurant added successfully',
      restaurant: newRestaurant
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});