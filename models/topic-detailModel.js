const { query } = require('../config/database');

class TopicDetailModel {
    async getAllTopics() {
        try {
            const topics = await query('SELECT * FROM ChuDe');
            return topics;
        } catch (error) {
            throw error;
        }
    }

    async updateTopic(maChuDe, tenChuDe, moTa) {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!maChuDe || isNaN(maChuDe)) {
                return {
                    success: false,
                    message: 'Mã chủ đề không hợp lệ hoặc không phải là số'
                };
            }

            // Kiểm tra và xử lý dữ liệu đầu vào
            const tenChuDeTrim = tenChuDe ? tenChuDe.trim() : '';
            const moTaTrim = moTa ? moTa.trim() : '';

            if (!tenChuDeTrim) {
                return {
                    success: false,
                    message: 'Tên chủ đề không được để trống'
                };
            }

            if (!moTaTrim) {
                return {
                    success: false,
                    message: 'Mô tả không được để trống'
                };
            }

            // Kiểm tra chủ đề có tồn tại không
            const checkTopic = await query(
                'SELECT MaChuDe FROM ChuDe WHERE MaChuDe = ?',
                [maChuDe]
            );

            if (checkTopic.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy chủ đề để cập nhật'
                };
            }

            // Kiểm tra tên chủ đề đã tồn tại chưa (trừ chính nó)
            const existingTopic = await query(
                'SELECT MaChuDe FROM ChuDe WHERE TenChuDe = ? AND MaChuDe != ?',
                [tenChuDeTrim, maChuDe]
            );

            if (existingTopic.length > 0) {
                return {
                    success: false,
                    message: 'Tên chủ đề đã tồn tại'
                };
            }

            // Cập nhật thông tin chủ đề
            const result = await query(
                'UPDATE ChuDe SET TenChuDe = ?, MoTa = ? WHERE MaChuDe = ?',
                [tenChuDeTrim, moTaTrim, maChuDe]
            );

            if (!result) {
                throw new Error('Lỗi khi thực hiện câu lệnh UPDATE');
            }

            if (result.affectedRows === 0) {
                return {
                    success: false,
                    message: 'Không có thay đổi nào được cập nhật'
                };
            }

            return {
                success: true,
                message: 'Cập nhật chủ đề thành công'
            };
        } catch (error) {
            console.error('Lỗi trong updateTopic:', error);
            return {
                success: false,
                message: 'Có lỗi xảy ra trong quá trình cập nhật chủ đề: ' + error.message
            };
        }
    }

    async deleteTopic(maChuDe) {
        try {
            await query('DELETE FROM ChuDe WHERE MaChuDe = ?', [maChuDe]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TopicDetailModel();