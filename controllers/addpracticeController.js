const { query, run } = require("../config/database");

const addpracticeController = {
  // Form thêm bài tập
  showAddForm: async (req, res) => {
    try {
      // Lấy danh sách chủ đề để hiển thị trong form
      const chuDe = await query("SELECT * FROM ChuDe");
      res.render("addpractice", {
        user: req.session.user,
        chuDe: chuDe,
      });
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).send("Lỗi server");
    }
  },

  // Thêm bài tập mới
  addPractice: async (req, res) => {
    try {
      const {
        title,
        description,
        difficulty,
        topic,
        input,
        expected,
        dataType,
      } = req.body;

      if (!req.session.user || !req.session.user.id) {
        throw new Error("Vui lòng đăng nhập để thêm bài tập");
      }

      const nguoiTao = req.session.user.id;
      const ngayTao = new Date().toISOString();

      if (
        !title ||
        !description ||
        !difficulty ||
        !topic ||
        !input ||
        !expected ||
        !dataType
      ) {
        throw new Error(
          "Vui lòng điền đầy đủ thông tin bài tập, bộ test và kiểu dữ liệu"
        );
      }

      // Thêm bài tập mới (không có KieuDuLieu)
      const baiTapResult = await run(
        `INSERT INTO BaiTap (TieuDe, MoTa, MucDoKho, MaChuDe, NgayTao, NguoiTao) 
       VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, difficulty, topic, ngayTao, nguoiTao]
      );

      if (!baiTapResult) {
        throw new Error("Không thể thêm bài tập: Lỗi khi thực hiện truy vấn");
      }

      // Thêm bộ test cho bài tập, có thêm KieuDuLieu (dataType)
      const boTestResult = await run(
        `INSERT INTO BoTest (MaBaiTap, DuLieuDauVao, DauRaMongDoi, LaCongKhai, KieuDuLieu) 
       VALUES (?, ?, ?, ?, ?)`,
        [baiTapResult.id, input, expected, 1, dataType]
      );

      if (!boTestResult) {
        await run("DELETE FROM BaiTap WHERE MaBaiTap = ?", [baiTapResult.id]);
        throw new Error("Không thể thêm bộ test: Lỗi khi thực hiện truy vấn");
      }

      res.redirect("/practice");
    } catch (error) {
      console.error("Lỗi khi thêm bài tập:", error);
      res.status(500).send("Đã xảy ra lỗi khi thêm bài tập: " + error.message);
    }
  },
};

module.exports = addpracticeController;
