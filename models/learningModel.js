const { query, run } = require('../config/database');

class LearningModel {
    async getAllLessons() {
        try {
            const lessons = await query(
                `SELECT BaiHoc.*, NguoiDung.HoTen as TenNguoiTao 
                FROM BaiHoc 
                LEFT JOIN NguoiDung ON BaiHoc.MaNguoiTao = NguoiDung.MaNguoiDung 
                ORDER BY NgayCapNhat DESC`
            );
            return lessons;
        } catch (error) {
            throw error;
        }
    }

    async getLessonById(maBaiHoc) {
        try {
            const lessons = await query(
                `SELECT BaiHoc.*, NguoiDung.HoTen as TenNguoiTao 
                FROM BaiHoc 
                LEFT JOIN NguoiDung ON BaiHoc.MaNguoiTao = NguoiDung.MaNguoiDung 
                WHERE MaBaiHoc = ?`,
                [maBaiHoc]
            );
            return lessons[0];
        } catch (error) {
            throw error;
        }
    }

    async createLesson(tieuDe, moTa, duongDanFile, ngonNguLapTrinh, maNguoiTao) {
        try {
            const result = await run(
                `INSERT INTO BaiHoc (TieuDe, MoTa, DuongDanFile, NgonNguLapTrinh, MaNguoiTao) 
                VALUES (?, ?, ?, ?, ?)`,
                [tieuDe, moTa, duongDanFile, ngonNguLapTrinh, maNguoiTao]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateLesson(maBaiHoc, tieuDe, moTa, duongDanFile, ngonNguLapTrinh) {
        try {
            const result = await run(
                `UPDATE BaiHoc 
                SET TieuDe = ?, MoTa = ?, 
                    DuongDanFile = COALESCE(?, DuongDanFile), 
                    NgonNguLapTrinh = ?, 
                    NgayCapNhat = CURRENT_TIMESTAMP 
                WHERE MaBaiHoc = ?`,
                [tieuDe, moTa, duongDanFile, ngonNguLapTrinh, maBaiHoc]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteLesson(maBaiHoc) {
        try {
            const result = await run(
                'DELETE FROM BaiHoc WHERE MaBaiHoc = ?',
                [maBaiHoc]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LearningModel();