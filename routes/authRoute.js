const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { query, run } = require("../config/database");

router.post("/register", async (req, res) => {
  try {
    const { email, hoTen, matKhau, vaiTro } = req.body;

    // Kiểm tra email đã tồn tại
    const users = await query("SELECT * FROM NguoiDung WHERE Email = ?", [
      email,
    ]);
    if (users.length > 0) {
      return res.json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(matKhau, 10);

    // Thêm người dùng mới
    await run(
      "INSERT INTO NguoiDung (HoTen, Email, MatKhau, VaiTro) VALUES (?, ?, ?, ?)",
      [hoTen, email, hashedPassword, vaiTro]
    );

    res.json({
      success: true,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.json({
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, matKhau } = req.body;

    // Tìm user theo email
    const users = await query("SELECT * FROM NguoiDung WHERE Email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    const user = users[0];

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(matKhau, user.MatKhau);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    // Lưu thông tin user vào session
    req.session.user = {
      id: user.MaNguoiDung,
      email: user.Email,
      hoTen: user.HoTen,
      vaiTro: user.VaiTro,
      Avatar: user.Avatar  // Thêm trường Avatar vào session
    };

    res.json({
      success: true,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.json({
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
    });
  }
});

module.exports = router;
