const express = require('express');
const router = express.Router();
const topicDetailController = require('../controllers/topic-detailController');

// Middleware kiểm tra đăng nhập
const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
};

// Route hiển thị trang chi tiết chủ đề
router.get('/topic/detail', checkLogin, topicDetailController.showTopicDetail);

// Route xử lý chỉnh sửa chủ đề
router.post('/topic/edit/:id', checkLogin, topicDetailController.editTopic);

// Route xử lý xóa chủ đề
router.delete('/topic/delete/:id', checkLogin, topicDetailController.deleteTopic);

module.exports = router;