const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Cấu hình multer cho upload ảnh
const storage = multer.diskStorage({
    destination: './public/uploads/avatars',
    filename: function(req, file, cb) {
        cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Giới hạn 1MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Kiểm tra loại file
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Hiển thị trang profile
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('profile', { user: req.session.user });
});

// Upload avatar
router.post('/avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: 'No file uploaded' });
        }

        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        
        // Cập nhật URL avatar trong database
        // ... code cập nhật database ...

        // Cập nhật session
        req.session.user.Avatar = avatarUrl;

        res.json({ success: true, avatarUrl });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Cập nhật thông tin profile
router.post('/update', async (req, res) => {
    try {
        const { hoTen, gioiThieu } = req.body;
        
        // Cập nhật thông tin trong database
        // ... code cập nhật database ...

        // Cập nhật session
        req.session.user.HoTen = hoTen;
        req.session.user.GioiThieu = gioiThieu;

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Đổi mật khẩu
router.post('/password', async (req, res) => {
    try {
        const { matKhauCu, matKhauMoi } = req.body;
        
        // Kiểm tra và cập nhật mật khẩu trong database
        // ... code cập nhật database ...

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;