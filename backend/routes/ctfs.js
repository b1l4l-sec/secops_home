const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const CTF = require('../models/CTF');
const { adminAuth } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ctf-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const ctfs = await CTF.find().sort({ createdAt: -1 });
    res.json(ctfs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ctf = await CTF.findById(req.params.id);
    if (!ctf) {
      return res.status(404).json({ message: 'CTF not found' });
    }
    res.json(ctf);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', adminAuth, upload.single('preview'), async (req, res) => {
  try {
    const { title, author, previewType, videoLink, description } = req.body;
    const preview = req.file ? `/uploads/${req.file.filename}` : req.body.preview || '';

    const ctf = new CTF({
      title,
      author,
      preview,
      previewType,
      videoLink,
      description
    });

    await ctf.save();
    res.status(201).json(ctf);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', adminAuth, upload.single('preview'), async (req, res) => {
  try {
    const { title, author, previewType, videoLink, description } = req.body;
    const updateData = { title, author, previewType, videoLink, description };

    if (req.file) {
      updateData.preview = `/uploads/${req.file.filename}`;
    } else if (req.body.preview) {
      updateData.preview = req.body.preview;
    }

    const ctf = await CTF.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!ctf) {
      return res.status(404).json({ message: 'CTF not found' });
    }

    res.json(ctf);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const ctf = await CTF.findByIdAndDelete(req.params.id);

    if (!ctf) {
      return res.status(404).json({ message: 'CTF not found' });
    }

    res.json({ message: 'CTF deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
