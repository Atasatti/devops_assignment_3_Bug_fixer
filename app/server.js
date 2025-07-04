const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection - Using MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://afnan:afnan@cluster0.jv1iq.mongodb.net/devops_tasks?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Refactor schema, model, endpoints, and logic from Task to Bug for Bug Fixer. Use bug-tracking fields and /api/bugs endpoints. Use 'Bug Fixer' in comments and logs where appropriate.
// Bug Schema
const bugSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Bug = mongoose.model('Bug', bugSchema);

// Routes

// GET - Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// GET - All bugs
app.get('/api/bugs', async (req, res) => {
    try {
        const bugs = await Bug.find().sort({ createdAt: -1 });
        res.json(bugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Single bug by ID
app.get('/api/bugs/:id', async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);
        if (!bug) {
            return res.status(404).json({ error: 'Bug not found' });
        }
        res.json(bug);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create new bug
app.post('/api/bugs', async (req, res) => {
    try {
        const bug = new Bug(req.body);
        await bug.save();
        res.status(201).json(bug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Update bug
app.put('/api/bugs/:id', async (req, res) => {
    try {
        const bug = await Bug.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!bug) {
            return res.status(404).json({ error: 'Bug not found' });
        }
        res.json(bug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete bug
app.delete('/api/bugs/:id', async (req, res) => {
    try {
        const bug = await Bug.findByIdAndDelete(req.params.id);
        if (!bug) {
            return res.status(404).json({ error: 'Bug not found' });
        }
        res.json({ message: 'Bug deleted successfully', bug });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
});

module.exports = app; 