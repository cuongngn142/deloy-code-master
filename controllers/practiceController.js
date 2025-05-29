const practiceDetailsModel = require("../models/practice-detailsModel");
const practiceModel = require("../models/practiceModel");

class PracticeController {
  async showDetails(req, res) {
    try {
      const practiceId = req.params.id;
      const practice = await practiceDetailsModel.getPracticeDetails(
        practiceId
      );

      if (!practice) {
        return res.status(404).render("error", {
          error: "Không tìm thấy bài tập",
          user: req.session.user, // Thêm user vào đây
        });
      }

      res.render("practice-details", {
        practice: practice,
        user: req.session.user, // Thêm user vào đây
      });
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).render("error", {
        error: "Có lỗi xảy ra khi tải thông tin bài tập",
        user: req.session.user, // Thêm user vào đây
      });
    }
  }

  async showEditForm(req, res) {
    try {
      const practiceId = req.params.id;
      const practice = await practiceDetailsModel.getPracticeDetails(
        practiceId
      );
      const topics = await practiceModel.getAllTopics();

      if (!practice) {
        return res.status(404).render("error", {
          error: "Không tìm thấy bài tập",
          user: req.session.user,
        });
      }

      res.render("practice-edit", {
        practice: practice,
        topics: topics,
        user: req.session.user,
      });
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).render("error", {
        error: "Có lỗi xảy ra khi tải thông tin bài tập",
        user: req.session.user,
      });
    }
  }

  async updatePractice(req, res) {
    try {
      const practiceId = req.params.id;
      const {
        TieuDe,
        MoTa,
        MucDoKho,
        MaChuDe,
        DuLieuDauVao,
        DauRaMongDoi,
        KieuDuLieu,
      } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (
        !TieuDe ||
        !MoTa ||
        !MucDoKho ||
        !MaChuDe ||
        !DuLieuDauVao ||
        !DauRaMongDoi ||
        !KieuDuLieu
      ) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin bài tập",
        });
      }

      const result = await practiceDetailsModel.updatePractice(practiceId, {
        TieuDe,
        MoTa,
        MucDoKho,
        MaChuDe,
        DuLieuDauVao,
        DauRaMongDoi,
        KieuDuLieu,
      });

      if (result.success) {
        res.json({ success: true, message: "Cập nhật bài tập thành công" });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi cập nhật bài tập",
      });
    }
  }

  async deletePractice(req, res) {
    try {
      const practiceId = req.params.id;
      const result = await practiceDetailsModel.deletePractice(practiceId);

      if (result.success) {
        res.json({ success: true, message: result.message });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi xóa bài tập",
      });
    }
  }
}

module.exports = new PracticeController();
