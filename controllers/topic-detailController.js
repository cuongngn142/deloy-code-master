const TopicDetailModel = require('../models/topic-detailModel');

class TopicDetailController {
    async showTopicDetail(req, res) {
        try {
            const topics = await TopicDetailModel.getAllTopics();
            res.render('topic-detail', {
                user: req.session.user,
                topics: topics
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).send('Đã xảy ra lỗi khi tải trang');
        }
    }

    async editTopic(req, res) {
        try {
            const maChuDe = req.params.id;
            const { TenChuDe, MoTa } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!TenChuDe || !MoTa) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên chủ đề và mô tả không được để trống'
                });
            }

            const result = await TopicDetailModel.updateTopic(maChuDe, TenChuDe, MoTa);
            
            if (result) {
                res.json({
                    success: true,
                    message: 'Cập nhật chủ đề thành công'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Không thể cập nhật chủ đề'
                });
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật chủ đề:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi cập nhật chủ đề'
            });
        }
    }

    async deleteTopic(req, res) {
        try {
            const { id } = req.params;
            await TopicDetailModel.deleteTopic(id);
            res.json({ success: true, message: 'Xóa chủ đề thành công' });
        } catch (error) {
            console.error('Lỗi:', error);
            res.json({ success: false, message: 'Có lỗi xảy ra khi xóa chủ đề' });
        }
    }
}

module.exports = new TopicDetailController();