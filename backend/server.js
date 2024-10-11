const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(cors());

app.post('/upload', upload.array('files'), (req, res) => {
    try {
        console.log('Received files:', req.files);
        if (!req.files) {
            return res.status(400).json({ result: false, msg: 'No files uploaded' });
        }
        return res.status(200).json({ result: true, msg: 'Files uploaded successfully' });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ result: false, msg: 'Internal Server Error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
