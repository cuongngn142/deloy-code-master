const LearningModel = require('../models/learningModel');
const path = require('path');
const fs = require('fs');

class LearningController {
    async showLessons(req, res) {
        try {
            const lessons = await LearningModel.getAllLessons();
            res.render('learning', { 
                user: req.session.user,
                lessons: lessons
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài học:', error);
            res.status(500).render('error', { 
                message: 'Đã xảy ra lỗi khi tải danh sách bài học',
                user: req.session.user
            });
        }
    }

    async showLessonDetail(req, res) {
        try {
            const maBaiHoc = req.params.id;
            const lesson = await LearningModel.getLessonById(maBaiHoc);
            
            if (!lesson) {
                return res.status(404).render('error', { 
                    message: 'Không tìm thấy bài học',
                    user: req.session.user
                });
            }
            
            res.render('lesson-detail', { 
                user: req.session.user,
                lesson: lesson
            });
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết bài học:', error);
            res.status(500).render('error', { 
                message: 'Đã xảy ra lỗi khi tải chi tiết bài học',
                user: req.session.user
            });
        }
    }

    async showAddForm(req, res) {
        if (!req.session.user || req.session.user.vaiTro !== 'Admin') {
            return res.redirect('/');
        }
        res.render('add-lesson', { user: req.session.user });
    }

    async addLesson(req, res) {
        try {
            if (!req.session.user || req.session.user.vaiTro !== 'Admin') {
                return res.status(403).json({ success: false, message: 'Không có quyền thực hiện' });
            }

            const { tieuDe, moTa, ngonNguLapTrinh } = req.body;
            const maNguoiTao = req.session.user.id;
            let duongDanFile = null;

            if (req.file) {
                duongDanFile = `/uploads/lessons/${req.file.filename}`;
            }

            await LearningModel.createLesson(tieuDe, moTa, duongDanFile, ngonNguLapTrinh, maNguoiTao);
            res.redirect('/learning');
        } catch (error) {
            console.error('Lỗi khi thêm bài học:', error);
            res.status(500).render('error', { 
                message: 'Đã xảy ra lỗi khi thêm bài học',
                user: req.session.user
            });
        }
    }

    async showEditForm(req, res) {
        try {
            if (!req.session.user || req.session.user.vaiTro !== 'Admin') {
                return res.redirect('/');
            }

            const maBaiHoc = req.params.id;
            const lesson = await LearningModel.getLessonById(maBaiHoc);
            
            if (!lesson) {
                return res.status(404).render('error', { 
                    message: 'Không tìm thấy bài học',
                    user: req.session.user
                });
            }
            
            res.render('edit-lesson', { 
                user: req.session.user,
                lesson: lesson
            });
        } catch (error) {
            console.error('Lỗi khi lấy thông tin bài học để sửa:', error);
            res.status(500).render('error', { 
                message: 'Đã xảy ra lỗi khi tải thông tin bài học',
                user: req.session.user
            });
        }
    }

    async updateLesson(req, res) {
        try {
            if (!req.session.user || req.session.user.vaiTro !== 'Admin') {
                return res.status(403).json({ success: false, message: 'Không có quyền thực hiện' });
            }

            const maBaiHoc = req.params.id;
            const { tieuDe, moTa, ngonNguLapTrinh } = req.body;
            let duongDanFile = null;

            if (req.file) {
                duongDanFile = `/uploads/lessons/${req.file.filename}`;
                
                // Xóa file cũ nếu có
                const lesson = await LearningModel.getLessonById(maBaiHoc);
                if (lesson && lesson.DuongDanFile) {
                    const oldFilePath = path.join(__dirname, '..', 'public', lesson.DuongDanFile);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
            }

            await LearningModel.updateLesson(maBaiHoc, tieuDe, moTa, duongDanFile, ngonNguLapTrinh);
            res.redirect(`/learning/${maBaiHoc}`);
        } catch (error) {
            console.error('Lỗi khi cập nhật bài học:', error);
            res.status(500).render('error', { 
                message: 'Đã xảy ra lỗi khi cập nhật bài học',
                user: req.session.user
            });
        }
    }

    async deleteLesson(req, res) {
        try {
            if (!req.session.user || req.session.user.vaiTro !== 'Admin') {
                return res.status(403).json({ success: false, message: 'Không có quyền thực hiện' });
            }

            const maBaiHoc = req.params.id;
            
            // Xóa file trước khi xóa bản ghi
            const lesson = await LearningModel.getLessonById(maBaiHoc);
            if (lesson && lesson.DuongDanFile) {
                const filePath = path.join(__dirname, '..', 'public', lesson.DuongDanFile);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            
            await LearningModel.deleteLesson(maBaiHoc);
            res.redirect('/learning');
        } catch (error) {
            console.error('Lỗi khi xóa bài học:', error);
            res.status(500).render('error', { 
                message: 'Đã xảy ra lỗi khi xóa bài học',
                user: req.session.user
            });
        }
    }
}

module.exports = new LearningController();