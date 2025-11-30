const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Class = require('../models/Class');
const { adminAuth } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'class-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pptx|ppt|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only PPTX, PPT, and PDF files are allowed'));
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().sort({ date: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', adminAuth, upload.single('contentFile'), async (req, res) => {
  try {
    const { title, description, instructor, date, time, location, capacity, contentLinks } = req.body;
    const contentFile = req.file ? `/uploads/${req.file.filename}` : req.body.contentFile || '';

    const classItem = new Class({
      title,
      description,
      instructor,
      date,
      time,
      location,
      capacity,
      contentFile,
      contentLinks: contentLinks ? (Array.isArray(contentLinks) ? contentLinks : JSON.parse(contentLinks)) : []
    });

    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', adminAuth, upload.single('contentFile'), async (req, res) => {
  try {
    const { title, description, instructor, date, time, location, capacity, contentLinks } = req.body;
    const updateData = { title, description, instructor, date, time, location, capacity };

    if (req.file) {
      updateData.contentFile = `/uploads/${req.file.filename}`;
    } else if (req.body.contentFile) {
      updateData.contentFile = req.body.contentFile;
    }

    if (contentLinks) {
      updateData.contentLinks = Array.isArray(contentLinks) ? contentLinks : JSON.parse(contentLinks);
    }

    const classItem = await Class.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
