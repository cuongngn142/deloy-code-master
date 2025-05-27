const { query } = require('../config/database');

class TopicModel {
    async checkTopicExists(tenChuDe) {
        try {
            const existingTopic = await query('SELECT * FROM ChuDe WHERE TenChuDe = ?', [tenChuDe]);
            return existingTopic.length > 0;
        } catch (error) {
            throw error;
        }
    }

    async createTopic(tenChuDe, moTa) {
        try {
            await query(
                'INSERT INTO ChuDe (TenChuDe, MoTa) VALUES (?, ?)',
                [tenChuDe, moTa]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getAllTopics() {
        try {
            const topics = await query('SELECT * FROM ChuDe');
            return topics;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TopicModel();