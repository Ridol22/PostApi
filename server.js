const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB কানেকশন (এখানে আপনার নিজের কানেকশন স্ট্রিং বসাবেন)
mongoose.connect('YOUR_MONGODB_URI');

const PostSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);

// সব পোস্ট পাওয়ার জন্য API
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// নতুন পোস্ট সেভ করার জন্য API
app.post('/api/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
});

app.listen(3000, () => console.log('Server running on port 3000'));
