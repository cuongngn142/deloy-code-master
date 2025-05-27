const { sql, poolPromise } = require('../config/database');

class IndexModel {
    async getHomeData() {
        try {
            const pool = await poolPromise;
            // Lấy dữ liệu từ bảng NguoiDung thay vì YourTable
            const result = await pool.request()
                .query('SELECT TOP 5 * FROM NguoiDung ORDER BY NgayTao DESC');
            return result.recordset;
        } catch (error) {
            console.error('Error in getHomeData:', error);
            throw error;
        }
    }
}

module.exports = new IndexModel();