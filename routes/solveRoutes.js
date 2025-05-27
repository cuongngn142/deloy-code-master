const express = require("express");
const router = express.Router();
const SolveController = require("../controllers/solveController");

// Middleware kiểm tra đăng nhập
const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
};

// Route trang giải bài (bắt buộc đăng nhập)
router.get("/solve/:id", checkLogin, SolveController.renderSolvePage);

// API nộp bài (bắt buộc đăng nhập)
router.post("/api/solve/submit", checkLogin, SolveController.submitSolution);

// API lấy bộ test theo maBaiTap (không cần đăng nhập, nếu muốn bảo mật có thể thêm checkLogin)
router.get("/api/testcases/:maBaiTap",checkLogin, SolveController.getBoTest);

// API lưu kết quả (hiện có checkLogin trong controller, hoặc thêm middleware nếu muốn bảo vệ)
router.post("/api/solve/saveResult",checkLogin, SolveController.saveResult);

module.exports = router;
