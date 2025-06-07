const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const LearningController = require('../controllers/learningController');

// Cấu hình multer cho upload file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.fieldname === 'inputFile') {
            cb(null, './public/uploads/lessons');
        } else if (file.fieldname === 'imageFile') {
            cb(null, './public/uploads/images');
        }
    },
    filename: function(req, file, cb) {
        if (file.fieldname === 'inputFile') {
            cb(null, 'lesson-' + Date.now() + path.extname(file.originalname));
        } else if (file.fieldname === 'imageFile') {
            cb(null, 'lesson-img-' + Date.now() + path.extname(file.originalname));
        }
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
    if (file.fieldname === 'inputFile') {
        // Kiểm tra file tài liệu
        const allowedTypes = /pdf|doc|docx|txt|md|ppt|pptx|xls|xlsx|zip|rar|jpg|jpeg|png|gif|mp4|avi|mp3|wav|odt|rtf|csv|html|xml/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            return cb(null, true);
        } else {
            cb('Error: Định dạng file không được hỗ trợ! Vui lòng chọn file với định dạng: PDF, DOC, DOCX, TXT, MD, PPT, PPTX, XLS, XLSX, ZIP, RAR, JPG, JPEG, PNG, GIF, MP4, AVI, MP3, WAV, ODT, RTF, CSV, HTML, XML');
        }
    } else if (file.fieldname === 'imageFile') {
        // Kiểm tra file ảnh
        const allowedImageTypes = /jpg|jpeg|png|gif|webp/;
        const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            return cb(null, true);
        } else {
            cb('Error: Định dạng ảnh không được hỗ trợ! Vui lòng chọn file với định dạng: JPG, JPEG, PNG, GIF, WEBP');
        }
    }
}

// Hiển thị danh sách bài học
router.get('/', LearningController.showLessons);

// Hiển thị form thêm bài học
router.get('/add', LearningController.showAddForm);

// Xử lý thêm bài học
router.post('/add', upload.fields([
    { name: 'inputFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
]), LearningController.addLesson);

// Hiển thị chi tiết bài học

router.get('/:id/details', LearningController.showLessonDetail);

// Hiển thị form sửa bài học
router.get('/:id/edit', LearningController.showEditForm);

// Xử lý sửa bài học
router.post('/:id/edit', upload.fields([
    { name: 'inputFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
]), LearningController.updateLesson);

// Xử lý edit markdown trực tiếp
router.post('/:id/edit-markdown', LearningController.updateMarkdown);

// Xử lý xóa bài học
router.get('/:id/delete', LearningController.deleteLesson);

module.exports = router;