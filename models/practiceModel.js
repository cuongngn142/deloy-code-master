const { query } = require('../config/database');

class PracticeModel {
    async getAllPractices() {
        try {
            const practices = await query(`
                SELECT BaiTap.*, ChuDe.TenChuDe 
                FROM BaiTap 
                LEFT JOIN ChuDe ON BaiTap.MaChuDe = ChuDe.MaChuDe
                ORDER BY BaiTap.NgayTao DESC
            `);
            return practices;
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

    async getPracticeById(id) {
        try {
            const practice = await query('SELECT * FROM BaiTap WHERE MaBaiTap = ?', [id]);
            return practice;
        } catch (error) {
            throw error;
        }
    }

    async searchPractices(searchTerm) {
        try {
            const practices = await query(
                'SELECT * FROM BaiTap WHERE TieuDe LIKE ? OR MoTa LIKE ?',
                [`%${searchTerm}%`, `%${searchTerm}%`]
            );
            return practices;
        } catch (error) {
            throw error;
        }
    }

    async filterPractices(difficulty, topic) {
        try {
            let sql = 'SELECT * FROM BaiTap WHERE 1=1';
            const params = [];
            
            if (difficulty) {
                sql += ' AND MucDoKho = ?';
                params.push(difficulty);
            }
            if (topic) {
                sql += ' AND MaChuDe = ?';
                params.push(topic);
            }
            
            const practices = await query(sql, params);
            return practices;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PracticeModel();