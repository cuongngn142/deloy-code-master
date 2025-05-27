const UserModel = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { email, matKhau } = req.body;
        const user = await UserModel.login(email, matKhau);
        
        if (user) {
            req.session.user = user;
            res.json({ success: true, message: 'Đăng nhập thành công' });
        } else {
            res.json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

exports.register = async (req, res) => {
    try {
        const { hoTen, email, matKhau, vaiTro } = req.body;
        await UserModel.register(hoTen, email, matKhau, vaiTro);
        res.json({ success: true, message: 'Đăng ký thành công bbbb' });
    } catch (error) {
        if (error.message.includes('Violation of UNIQUE KEY constraint')) {
            res.json({ success: false, message: 'Email đã tồn tại' });
        } else {
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    }
};