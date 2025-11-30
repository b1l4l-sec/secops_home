const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { adminAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, role, image, bio, linkedin, github } = req.body;

    const member = new Member({
      name,
      role,
      image,
      bio,
      linkedin,
      github
    });

    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, role, image, bio, linkedin, github } = req.body;

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { name, role, image, bio, linkedin, github },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
