const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Lỗi kết nối SQLite:", err);
  } else {
    console.log("Đã kết nối thành công đến SQLite");
    db.run("PRAGMA foreign_keys = ON");
    initDatabase();
  }
});

// Hàm khởi tạo database
function initDatabase() {
  db.serialize(() => {
    // Bảng NguoiDung
    db.run(`CREATE TABLE IF NOT EXISTS NguoiDung (
            MaNguoiDung INTEGER PRIMARY KEY AUTOINCREMENT,
            HoTen TEXT NOT NULL,
            Email TEXT NOT NULL UNIQUE,
            MatKhau TEXT NOT NULL,
            VaiTro TEXT NOT NULL CHECK(VaiTro IN ('Admin', 'User')),
            NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

    // Bảng ChuDe
    db.run(`CREATE TABLE IF NOT EXISTS ChuDe (
            MaChuDe INTEGER PRIMARY KEY AUTOINCREMENT,
            TenChuDe TEXT NOT NULL UNIQUE,
            MoTa TEXT
        )`);

    // Bảng BaiTap
    db.run(`CREATE TABLE IF NOT EXISTS BaiTap (
            MaBaiTap INTEGER PRIMARY KEY AUTOINCREMENT,
            TieuDe TEXT NOT NULL,
            MoTa TEXT NOT NULL,
            MucDoKho TEXT NOT NULL CHECK(MucDoKho IN ('Dễ', 'Trung Bình', 'Khó')),
            MaChuDe INTEGER,
            NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
            NguoiTao INTEGER,
            FOREIGN KEY (MaChuDe) REFERENCES ChuDe(MaChuDe) ON DELETE SET NULL,
            FOREIGN KEY (NguoiTao) REFERENCES NguoiDung(MaNguoiDung) ON DELETE SET NULL
        )`);

    // Bảng NgonNguLapTrinh
    db.run(`CREATE TABLE IF NOT EXISTS NgonNguLapTrinh (
            MaNgonNgu INTEGER PRIMARY KEY AUTOINCREMENT,
            TenNgonNgu TEXT NOT NULL UNIQUE
        )`);

    // Bảng BaiNop
    db.run(`CREATE TABLE IF NOT EXISTS BaiNop (
            MaBaiNop INTEGER PRIMARY KEY AUTOINCREMENT,
            MaNguoiDung INTEGER,
            MaBaiTap INTEGER,
            MaNgonNgu INTEGER,
            MaNguon TEXT NOT NULL,
            ThoiGianNop DATETIME DEFAULT CURRENT_TIMESTAMP,
            TrangThai TEXT CHECK(TrangThai IN ('Đang chấm', 'Đúng', 'Sai', 'Lỗi biên dịch', 'Lỗi runtime', 'Quá thời gian')),
            ThoiGianChay REAL,
            BoNhoSuDung REAL,
            FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
            FOREIGN KEY (MaBaiTap) REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
            FOREIGN KEY (MaNgonNgu) REFERENCES NgonNguLapTrinh(MaNgonNgu) ON DELETE CASCADE
        )`);

    // Bảng BoTest
    db.run(`CREATE TABLE IF NOT EXISTS BoTest (
            MaTest INTEGER PRIMARY KEY AUTOINCREMENT,
            MaBaiTap INTEGER,
            DuLieuDauVao TEXT NOT NULL,
            DauRaMongDoi TEXT NOT NULL,
            LaCongKhai INTEGER DEFAULT 0,
            FOREIGN KEY (MaBaiTap) REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE
        )`);

    // Bảng KetQuaBaiNop
    db.run(`CREATE TABLE IF NOT EXISTS KetQuaBaiNop (
        MaKetQua INTEGER PRIMARY KEY AUTOINCREMENT,
        MaBaiTap INTEGER,
        MaNguoiDung INTEGER,
        MaNgonNgu INTEGER,
        MaTest INTEGER,
        DauRaThucTe TEXT,
        DatYeuCau INTEGER NOT NULL,
        Diem INTEGER DEFAULT 0,
        ThoiGianNop DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (MaBaiTap) REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
        FOREIGN KEY (MaTest) REFERENCES BoTest(MaTest),
        FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
        FOREIGN KEY (MaNgonNgu) REFERENCES NgonNguLapTrinh(MaNgonNgu) ON DELETE CASCADE)`);

    // Bảng DanhSachBaiTap
    db.run(`CREATE TABLE IF NOT EXISTS DanhSachBaiTap (
            MaDanhSach INTEGER PRIMARY KEY AUTOINCREMENT,
            TenDanhSach TEXT NOT NULL,
            MoTa TEXT,
            MaNguoiTao INTEGER,
            NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
            LaCongKhai INTEGER DEFAULT 0,
            FOREIGN KEY (MaNguoiTao) REFERENCES NguoiDung(MaNguoiDung) ON DELETE SET NULL
        )`);

    // Bảng ChiTietDanhSachBaiTap
    db.run(`CREATE TABLE IF NOT EXISTS ChiTietDanhSachBaiTap (
            MaChiTiet INTEGER PRIMARY KEY AUTOINCREMENT,
            MaDanhSach INTEGER,
            MaBaiTap INTEGER,
            ThuTu INTEGER,
            FOREIGN KEY (MaDanhSach) REFERENCES DanhSachBaiTap(MaDanhSach) ON DELETE CASCADE,
            FOREIGN KEY (MaBaiTap) REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
            UNIQUE(MaDanhSach, MaBaiTap)
        )`);

    // Bảng LichSuHoatDong
    db.run(`CREATE TABLE IF NOT EXISTS LichSuHoatDong (
            MaHoatDong INTEGER PRIMARY KEY AUTOINCREMENT,
            MaNguoiDung INTEGER,
            MoTaHoatDong TEXT,
            ThoiGianHoatDong DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE
        )`);

    // Bảng XepHang
    db.run(`CREATE TABLE IF NOT EXISTS XepHang (
            MaXepHang INTEGER PRIMARY KEY AUTOINCREMENT,
            MaNguoiDung INTEGER,
            DiemSo INTEGER DEFAULT 0,
            HuyHieu TEXT,
            FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE
        )`);
  });
}

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

module.exports = {
  db,
  query,
  run,
};
