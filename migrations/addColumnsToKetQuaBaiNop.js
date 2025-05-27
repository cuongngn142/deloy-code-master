const database = require('../config/database');

async function addColumns() {
    try {
        // Thêm cột Diem
        await database.run(`
            ALTER TABLE KetQuaBaiNop 
            ADD COLUMN Diem INTEGER DEFAULT 0
        `);

        // Thêm cột MaNguoiDung
        await database.run(`
            ALTER TABLE KetQuaBaiNop 
            ADD COLUMN MaNguoiDung INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE
        `);

        console.log('Đã thêm cột thành công!');
    } catch (error) {
        console.error('Lỗi khi thêm cột:', error);
    }
}

addColumns();