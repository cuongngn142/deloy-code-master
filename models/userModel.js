const { query, run } = require('../config/database');

class UserModel {
    async register(hoTen, email, matKhau, vaiTro) {
        try {
            const result = await run(
                'INSERT INTO NguoiDung (HoTen, Email, MatKhau, VaiTro) VALUES (?, ?, ?, ?)',
                [hoTen, email, matKhau, vaiTro]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    async login(email, matKhau) {
        try {
            const users = await query(
                'SELECT * FROM NguoiDung WHERE Email = ? AND MatKhau = ?',
                [email, matKhau]
            );
            return users[0];
        } catch (error) {
            throw error;
        }
    }

    async updateAvatar(maNguoiDung, avatarUrl) {
        try {
            const result = await run(
                'UPDATE NguoiDung SET Avatar = ? WHERE MaNguoiDung = ?',
                [avatarUrl, maNguoiDung]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel();