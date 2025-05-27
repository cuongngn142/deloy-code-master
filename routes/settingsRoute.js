const express = require('express');
const router = express.Router();

// Middleware kiểm tra đăng nhập
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

// Hiển thị trang settings
router.get('/', isAuthenticated, (req, res) => {
    res.render('settings', { user: req.session.user });
});

// API cập nhật cài đặt chung
router.post('/generalSettingsForm', isAuthenticated, async (req, res) => {
    try {
        // Xử lý cập nhật cài đặt chung
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// API cập nhật thông báo
router.post('/notificationSettingsForm', isAuthenticated, async (req, res) => {
    try {
        // Xử lý cập nhật thông báo
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// API cập nhật quyền riêng tư
router.post('/privacySettingsForm', isAuthenticated, async (req, res) => {
    try {
        // Xử lý cập nhật quyền riêng tư
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// API cập nhật giao diện
router.post('/appearanceSettingsForm', isAuthenticated, async (req, res) => {
    try {
        // Xử lý cập nhật giao diện
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;