const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const LearningController = require('../controllers/learningController');

// Cấu hình multer cho upload file PDF
const storage = multer.diskStorage({
    destination: './public/uploads/lessons',
    filename: function(req, file, cb) {
        cb(null, 'lesson-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Giới hạn 10MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Kiểm tra loại file
function checkFileType(file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: PDF Only!');
    }
}

// Hiển thị danh sách bài học
router.get('/', LearningController.showLessons);

// Hiển thị form thêm bài học
router.get('/add', LearningController.showAddForm);

// Xử lý thêm bài học
router.post('/add', upload.single('pdfFile'), LearningController.addLesson);

// Hiển thị chi tiết bài học
router.get('/:id', LearningController.showLessonDetail);

// Hiển thị form sửa bài học
router.get('/:id/edit', LearningController.showEditForm);

// Xử lý sửa bài học
router.post('/:id/edit', upload.single('pdfFile'), LearningController.updateLesson);

// Xử lý xóa bài học
router.get('/:id/delete', LearningController.deleteLesson);

module.exports = router;