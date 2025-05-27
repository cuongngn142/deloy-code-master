const practiceController = require('../controllers/practiceController');

// ... existing code ...

// Routes cho trang chi tiết bài tập
router.get('/practice/details/:id', practiceController.showDetails);

// API routes
router.put('/api/practices/:id', practiceController.updatePractice);
router.delete('/api/practices/:id', practiceController.deletePractice);

// ... existing code ...