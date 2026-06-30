const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://database:27017/todo-db';

// Middleware to parse form data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB Database
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB backend!'))
  .catch(err => console.error('Database connection error:', err));

// Define a structural Database Schema for tasks
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', TaskSchema);

// Endpoint 1: Serve the main structural Web Frontend
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    
    // Inject dynamic data directly into clean HTML
    let taskListItems = tasks.map(task => `
      <li style="padding: 10px; background: #f4f4f4; border-bottom: 1px solid #ddd; margin-bottom: 5px; list-style: none;">
        ${task.title} <small style="color:#888;">(${new Date(task.createdAt).toLocaleTimeString()})</small>
      </li>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Day 36 Production App</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2>📝 DevOps Task Tracker (Day 36)</h2>
        <form action="/add" method="POST" style="display: flex; margin-bottom: 20px;">
          <input type="text" name="title" placeholder="Enter a production task..." required style="flex: 1; padding: 10px; font-size: 16px;">
          <button type="submit" style="padding: 10px 20px; background: #28a745; color: white; border: none; font-size: 16px; cursor: pointer;">Add Task</button>
        </form>
        <h3>Active Tasks:</h3>
        <ul style="padding: 0;">
          ${taskListItems || '<p style="color:#777;">No tasks active. Add one above!</p>'}
        </ul>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Server Error parsing dashboard data.");
  }
});

// Endpoint 2: Accept form submissions and save into MongoDB
app.post('/add', async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    await newTask.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send("Error saving task to persistent storage.");
  }
});

app.listen(PORT, () => {
  console.log(`Web application hosting live on port ${PORT}`);
});
