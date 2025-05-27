const { query } = require('../config/database');

class PracticeDetailsModel {
    async getPracticeDetails(id) {
        try {
            const practice = await query(
                'SELECT bts.* , bt.*, cd.TenChuDe FROM BoTest bts JOIN BaiTap bt ON bts.MaBaiTap = bt.MaBaiTap JOIN ChuDe cd ON bt.MaChuDe = cd.MaChuDe WHERE bt.MaBaiTap = ?',
                [id]
            );
            return practice[0];
        } catch (error) {
            throw error;
        }
    }

    async deletePractice(id) {
        try {
            // Kiểm tra id có hợp lệ không
            if (!id) {
                return {
                    success: false,
                    message: 'ID bài tập không hợp lệ'
                };
            }

            // Kiểm tra bài tập có tồn tại không
            const practice = await query(
                'SELECT MaBaiTap FROM BaiTap WHERE MaBaiTap = ?',
                [id]
            );

            if (practice.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy bài tập để xóa'
                };
            }

            try {
                // Xóa tất cả các bản ghi liên quan theo thứ tự
                // 1. Xóa kết quả bài nộp
                const deleteKetQua = await query(
                    'DELETE FROM KetQuaBaiNop WHERE MaBaiTap = ?',
                    [id]
                );
                console.log('Đã xóa kết quả bài nộp:', deleteKetQua.affectedRows, 'bản ghi');

                // 2. Xóa bộ test
                const deleteBoTest = await query(
                    'DELETE FROM BoTest WHERE MaBaiTap = ?',
                    [id]
                );
                console.log('Đã xóa bộ test:', deleteBoTest.affectedRows, 'bản ghi');

                // 3. Xóa từ bảng ChiTietDanhSachBaiTap nếu có
                const deleteChiTiet = await query(
                    'DELETE FROM ChiTietDanhSachBaiTap WHERE MaBaiTap = ?',
                    [id]
                );
                console.log('Đã xóa chi tiết danh sách:', deleteChiTiet.affectedRows, 'bản ghi');

                // 4. Cuối cùng mới xóa bài tập
                const result = await query(
                    'DELETE FROM BaiTap WHERE MaBaiTap = ?',
                    [id]
                );

                if (!result || result.affectedRows === 0) {
                    throw new Error('Không thể xóa bài tập');
                }

                return {
                    success: true,
                    message: 'Xóa bài tập thành công'
                };
            } catch (deleteError) {
                console.error('Lỗi khi xóa các bản ghi:', deleteError);
                return {
                    success: false,
                    message: 'Có lỗi xảy ra khi xóa dữ liệu liên quan: ' + deleteError.message
                };
            }
        } catch (error) {
            console.error('Lỗi khi xóa bài tập:', error);
            return {
                success: false,
                message: 'Có lỗi xảy ra trong quá trình xóa bài tập: ' + error.message
            };
        }
    }

    async updatePractice(id, data) {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!id) {
                return {
                    success: false,
                    message: 'ID bài tập không hợp lệ'
                };
            }

            if (!data) {
                return {
                    success: false,
                    message: 'Dữ liệu cập nhật không được để trống'
                };
            }

            // Kiểm tra từng trường dữ liệu riêng biệt
            if (!data.TieuDe || data.TieuDe.trim() === '') {
                return {
                    success: false,
                    message: 'Tiêu đề không được để trống'
                };
            }

            if (!data.MoTa || data.MoTa.trim() === '') {
                return {
                    success: false,
                    message: 'Mô tả không được để trống'
                };
            }

            if (!data.MucDoKho || !['Dễ', 'Trung Bình', 'Khó'].includes(data.MucDoKho)) {
                return {
                    success: false,
                    message: 'Mức độ khó không hợp lệ'
                };
            }

            if (!data.MaChuDe) {
                return {
                    success: false,
                    message: 'Mã chủ đề không được để trống'
                };
            }
            

            // Kiểm tra bài tập có tồn tại không
            const practice = await query(
                'SELECT * FROM BaiTap WHERE MaBaiTap = ?',
                [id]
            );

            if (practice.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy bài tập để cập nhật'
                };
            }

            // Kiểm tra chủ đề có tồn tại không
            const topic = await query(
                'SELECT MaChuDe FROM ChuDe WHERE MaChuDe = ?',
                [data.MaChuDe]
            );

            if (topic.length === 0) {
                return {
                    success: false,
                    message: 'Chủ đề không tồn tại'
                };
            }

            // Cập nhật thông tin bài tập
            await query(
                'UPDATE BaiTap SET TieuDe = ?, MoTa = ?, MucDoKho = ?, MaChuDe = ? WHERE MaBaiTap = ?',
                [data.TieuDe, data.MoTa, data.MucDoKho, data.MaChuDe, id]
            );

            // Cập nhật hoặc tạo mới bộ test
            const existingTest = await query('SELECT * FROM BoTest WHERE MaBaiTap = ?', [id]);
            
            if (existingTest.length > 0) {
                // Cập nhật bộ test hiện có
                await query(
                    'UPDATE BoTest SET DuLieuDauVao = ?, DauRaMongDoi = ?,  KieuDuLieu = ? WHERE MaBaiTap = ?',
                    [data.DuLieuDauVao, data.DauRaMongDoi, data.KieuDuLieu, id]
                );
            } else {
                // Tạo mới bộ test
                await query(
                    'INSERT INTO BoTest (MaBaiTap, DuLieuDauVao, DauRaMongDoi, KieuDuLieu) VALUES (?, ?, ?, ?)',
                    [id, data.DuLieuDauVao, data.DauRaMongDoi, data.KieuDuLieu]
                );
            }

            return {
                success: true,
                message: 'Cập nhật bài tập thành công'
            };
        } catch (error) {
            console.error('Lỗi khi cập nhật bài tập:', error);
            return {
                success: false,
                message: 'Có lỗi xảy ra khi cập nhật bài tập'
            };
        }
    }
}

module.exports = new PracticeDetailsModel();