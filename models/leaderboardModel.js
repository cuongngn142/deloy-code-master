const database = require('../config/database');

class LeaderboardModel {
  async getTopUsers() {
    const sql = `
      SELECT 
        u.MaNguoiDung,
        u.HoTen, 
        COALESCE(SUM(CASE WHEN k.DatYeuCau = 1 THEN k.Diem ELSE 0 END), 0) as DiemSo 
      FROM NguoiDung u
      LEFT JOIN KetQuaBaiNop k ON u.MaNguoiDung = k.MaNguoiDung
      GROUP BY u.MaNguoiDung, u.HoTen
      ORDER BY DiemSo DESC
      LIMIT 3
    `;
    
    try {
      return await database.query(sql);
    } catch (error) {
      throw error;
    }
  }

  async getOtherUsers() {
    const sql = `
      SELECT 
        u.MaNguoiDung,
        u.HoTen,
        COALESCE(SUM(CASE WHEN k.DatYeuCau = 1 THEN k.Diem ELSE 0 END), 0) as DiemSo 
      FROM NguoiDung u
      LEFT JOIN KetQuaBaiNop k ON u.MaNguoiDung = k.MaNguoiDung
      GROUP BY u.MaNguoiDung, u.HoTen
      ORDER BY DiemSo DESC
      LIMIT 9 OFFSET 3
    `;
    
    try {
      return await database.query(sql);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LeaderboardModel();