const express = require('express');
const router = express.Router();
const addpracticeController = require('../controllers/addpracticeController');

// Middleware kiểm tra đăng nhập
const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
};

// Route để hiển thị form thêm bài tập
router.get('/practice/add', checkLogin, addpracticeController.showAddForm);

// Route để xử lý dữ liệu khi form được submit
router.post('/practice/add', checkLogin, addpracticeController.addPractice);

module.exports = router;