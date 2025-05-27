const express = require('express');
const router = express.Router();
const topicModel = require('../models/topicModel');

// Middleware kiểm tra đăng nhập
const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập' });
    }
    next();
};

// API thêm chủ đề mới
router.post('/api/topics', checkLogin, async (req, res) => {
    try {
        const { TenChuDe, MoTa } = req.body;

        // Kiểm tra tên chủ đề đã tồn tại chưa
        const exists = await topicModel.checkTopicExists(TenChuDe);
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Tên chủ đề đã tồn tại'
            });
        }

        // Thêm chủ đề mới
        await topicModel.createTopic(TenChuDe, MoTa);

        res.json({
            success: true,
            message: 'Thêm chủ đề thành công'
        });
    } catch (error) {
        console.error('Lỗi khi thêm chủ đề:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi thêm chủ đề'
        });
    }
});

module.exports = router;