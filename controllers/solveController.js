const SolveModel = require("../models/solve");
const axios = require("axios");

class SolveController {
  // Render trang giải bài
  static async renderSolvePage(req, res) {
    try {
      const maBaiTap = req.params.id;
      const baiTapRows = await SolveModel.getBaiTap(maBaiTap);

      if (baiTapRows.length === 0) {
        return res.status(404).send("Bài tập không tồn tại");
      }

      const baiTap = baiTapRows[0];
      const ngonNgu = await SolveModel.getNgonNguLapTrinh();

      res.render("solve", {
        baiTap,
        ngonNgu,
        user: req.session.user,
      });
    } catch (error) {
      console.error("Lỗi render trang giải bài:", error);
      res.status(500).send("Lỗi server khi tải trang giải bài");
    }
  }

  // Xử lý submit bài giải (loại bỏ bảng BaiNop)
  static async submitSolution(req, res) {
    try {
      const { maBaiTap, maNgonNgu, maNguon } = req.body;
      const maNguoiDung = req.session.user.MaNguoiDung;

      // Lấy tất cả bộ test của bài tập
      const boTest = await SolveModel.getBoTest(maBaiTap);

      let allPassed = true;
      let totalScore = 0;
      const testResults = [];

      // Xóa hết kết quả cũ của người dùng với bài và ngôn ngữ này nếu muốn lưu lại kết quả mới (tùy chọn)
      // await SolveModel.deleteKetQuaCu(maBaiTap, maNguoiDung, maNgonNgu);

      for (const testCase of boTest) {
        // Gọi API Piston chạy code
        const pistonResponse = await axios.post(
          "https://emkc.org/api/v2/piston/execute",
          {
            language: maNgonNgu,
            source: maNguon,
            stdin: testCase.DuLieuDauVao,
          }
        );

        const ketQua = pistonResponse.data;
        const outputClean = (ketQua.output || ketQua.stdout || "").trim();
        const expectedOutput = testCase.DauRaMongDoi.trim();

        const passed = outputClean === expectedOutput;
        if (!passed) allPassed = false;

        const diem = passed ? 100 : 0;
        totalScore += diem;

        // Lưu kết quả chi tiết test case vào KetQuaBaiNop
        await SolveModel.saveKetQuaTest(
          maBaiTap,
          maNguoiDung,
          maNgonNgu,
          testCase.MaTest,
          outputClean,
          passed ? 1 : 0,
          diem,
        );

        testResults.push({
          maTest: testCase.MaTest,
          passed,
          output: outputClean,
          expected: expectedOutput,
        });
      }

      const trangThai = allPassed ? "Đúng" : "Sai";

      return res.json({
        success: true,
        trangThai,
        totalScore,
        testResults,
      });
    } catch (error) {
      console.error("Lỗi khi chấm bài:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi chấm bài",
      });
    }
  }

  static async getBoTest(req, res) {
    try {
      const maBaiTap = req.params.maBaiTap;
      const boTest = await SolveModel.getBoTest(maBaiTap);

      if (!boTest || boTest.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy bộ test" });
      }
      res.json(boTest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy bộ test" });
    }
  }

  static async saveResult(req, res) {
    try {
      let {
        MaBaiTap,
        MaNguoiDung,
        MaTest,
        MaNgonNgu,
        DauRaThucTe,
        DatYeuCau,
        Diem,
      } = req.body;

      if (!MaNgonNgu) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu tên ngôn ngữ lập trình" });
      }

      const maBaiTap = Number(MaBaiTap);
      const maNguoiDung = Number(MaNguoiDung);
      const maTest = Number(MaTest);
      const tenNgonNgu = MaNgonNgu;

      const maNgonNgu = await SolveModel.getMaNgonNgu(tenNgonNgu);

      if (!maNgonNgu) {
        return res
          .status(400)
          .json({
            success: false,
            message: `Không tìm thấy ngôn ngữ: ${tenNgonNgu}`,
          });
      }

      const datYeuCauInt = DatYeuCau ? 1 : 0;

      const result = await SolveModel.saveKetQuaTest(
        maBaiTap,
        maNguoiDung,
        maNgonNgu,
        maTest,
        DauRaThucTe,
        datYeuCauInt,
        Diem
      );

      if (result) {
        return res.json({ success: true, message: "Lưu kết quả thành công" });
      } else {
        return res.json({ success: false, message: "Lưu kết quả thất bại" });
      }
    } catch (error) {
      console.error("Lỗi lưu kết quả:", error);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server khi lưu kết quả" });
    }
  }
}

module.exports = SolveController;
