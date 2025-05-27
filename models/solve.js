const { query, run } = require("../config/database");

class SolveModel {
  // Lấy thông tin bài tập theo id
  static async getBaiTap(maBaiTap) {
    return await query(
      "SELECT BaiTap.*, ChuDe.TenChuDe FROM BaiTap LEFT JOIN ChuDe ON BaiTap.MaChuDe = ChuDe.MaChuDe WHERE MaBaiTap = ?",
      [maBaiTap]
    );
  }

  // Lấy danh sách ngôn ngữ lập trình
  static async getNgonNguLapTrinh() {
    return await query("SELECT * FROM NgonNguLapTrinh");
  }

  // Lấy bộ test của bài tập
  static async getBoTest(maBaiTap) {
    return await query("SELECT * FROM BoTest WHERE MaBaiTap = ?", [maBaiTap]);
  }

  // Tạo bài nộp mới
  static async createBaiNop(maNguoiDung, maBaiTap, maNgonNgu, maNguon) {
    const result = await run(
      "INSERT INTO BaiNop (MaNguoiDung, MaBaiTap, MaNgonNgu, MaNguon, TrangThai) VALUES (?, ?, ?, ?, ?)",
      [maNguoiDung, maBaiTap, maNgonNgu, maNguon, "Đang chấm"]
    );
    return result; // result.insertId
  }

  // Lưu kết quả chi tiết cho từng test case
  static async saveKetQuaTest(
    maBaiTap,
    maNguoiDung,
    maNgonNgu,
    maTest,
    dauRaThucTe,
    datYeuCau,
    diem
  ) {
    return await run(
      `INSERT INTO KetQuaBaiNop 
    (MaBaiTap, MaNguoiDung, MaNgonNgu, MaTest, DauRaThucTe, DatYeuCau, Diem) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        maBaiTap,
        maNguoiDung,
        maNgonNgu,
        maTest,
        dauRaThucTe,
        datYeuCau ? 1 : 0, // Chuyển datYeuCau thành 1 hoặc 0 nếu cần
        diem,
      ]
    );
  }
  static async getMaNgonNgu(tenNgonNgu) {
    const rows = await query(
      "SELECT MaNgonNgu FROM NgonNguLapTrinh WHERE TenNgonNgu = ?",
      [tenNgonNgu]
    );
    if (rows.length === 0)
      throw new Error(`Không tìm thấy ngôn ngữ: ${tenNgonNgu}`);
    return rows[0].MaNgonNgu;
  }
}

module.exports = SolveModel;
