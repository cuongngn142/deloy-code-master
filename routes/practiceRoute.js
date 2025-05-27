const express = require('express');
const router = express.Router();
const practiceModel = require('../models/practiceModel');
const practiceController = require('../controllers/practiceController');

// Route trang chủ
router.get('/', async (req, res) => {
    try {
        const topics = await practiceModel.getAllTopics();
        const practices = await practiceModel.getAllPractices();

        res.render('practice', { 
            user: req.session.user,
            practices: practices,
            topics: topics
        });
    } catch (error) {
        console.error('Lỗi khi tải trang practice:', error);
        res.status(500).send('Đã xảy ra lỗi khi tải trang');
    }
});

// Route tìm kiếm và lọc
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const practices = await practiceModel.searchPractices(searchTerm);
        res.json(practices);
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

router.get('/filter', async (req, res) => {
    try {
        const { difficulty, topic } = req.query;
        const practices = await practiceModel.filterPractices(difficulty, topic);
        res.json(practices);
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Route CRUD bài tập
router.get('/details/:id', practiceController.showDetails);
router.get('/edit/:id', practiceController.showEditForm);
router.post('/edit/:id', practiceController.updatePractice);
router.delete('/delete/:id', practiceController.deletePractice);

// Route xem chi tiết bài tập (đặt cuối cùng)
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const practice = await practiceModel.getPracticeById(id);
        if (practice.length > 0) {
            res.render('practice-detail', { practice: practice[0] });
        } else {
            res.status(404).send('Không tìm thấy bài tập');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Lỗi server');
    }
});

module.exports = router;