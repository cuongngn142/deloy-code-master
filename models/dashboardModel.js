const { db } = require("../config/database");

const countAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(MaNguoiDung) AS userQuantity FROM NguoiDung`;
    db.get(query, [], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
        console.log(row);
      }
    });
  });
};

const countAllExercises = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(MaBaiTap) AS practiceQuantity FROM BaiTap`;
    db.get(query, [], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
        console.log(row);
      }
    });
  });
};

const countExercisesByTopic = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT c.TenChuDe, COUNT(bt.MaBaiTap) AS quantityExercises 
    FROM ChuDe c JOIN BaiTap bt ON c.MaChuDe = bt.MaChuDe GROUP BY c.TenChuDe`;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
        console.log(rows);
      }
    });
  });
};

const countSubmissionResult = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(MaKetQua) AS SubmissionResultQuantity FROM KetQuaBaiNop `;
    db.get(query, [], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const countProgrammingLanguagesBySubmissionResult = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT n.TenNgonNgu, COUNT(kq.MaBaiTap) AS quantitySubmissionExercises
    FROM NgonNguLapTrinh n JOIN KetQuaBaiNop kq ON n.MaNgonNgu = kq.MaNgonNgu GROUP BY n.TenNgonNgu `;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getListUsers = () => {
  return new Promise((relsove, reject) => {
    const query = `SELECT MaNguoiDung, HoTen, Email, VaiTro, NgayTao FROM NguoiDung`;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        relsove(rows);
      }
    });
  });
};

const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM NguoiDung Where MaNguoiDung = ?`;
    //db.run chạy lệnh ko trả về dữ liệu
    //dùng function thường ms this. đc
    db.run(query, [id], function (err) {
      if (err) {
        reject({
          success: false,
          message: "Lỗi khi xóa người dùng",
          error: err,
        });
      } else {
        if (this.changes === 0) {
          resolve({
            success: false,
            message: "Không tìm thấy người dùng để xóa!",
          });
        } else {
          resolve({
            success: true,
            message: `Xóa người dùng có id là ${id} thành công!`,
          });
        }
      }
    });
  });
};

const updateUserById = (id, data) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE NguoiDung SET HoTen = ?, Email = ?, VaiTro = ?, NgayTao = ? WHERE MaNguoiDung = ?`;
    const params = [data.HoTen, data.Email, data.VaiTro, data.NgayTao, id];

    db.run(query, params, function (err) {
      if (err) {
        reject({ success: false, message: "Lỗi khi cập nhật người dùng" });
      } else {
        resolve({
          success: true,
          message: "Đã cập nhật user có id: " + data.MaNguoiDung,
        });
      }
    });
  });
};

module.exports = {
  countAllUsers,
  countAllExercises,
  countExercisesByTopic,
  countSubmissionResult,
  countProgrammingLanguagesBySubmissionResult,
  getListUsers,
  deleteUserById,
  updateUserById,
};

//aa
