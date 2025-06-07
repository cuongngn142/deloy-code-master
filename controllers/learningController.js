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
            let imagePath = null;

            if (req.files) {
                if (req.files.inputFile && req.files.inputFile[0]) {
                    duongDanFile = `/uploads/lessons/${req.files.inputFile[0].filename}`;
                }
                if (req.files.imageFile && req.files.imageFile[0]) {
                    imagePath = `/images/img/${req.files.imageFile[0].filename}`;
                }
            }

            await LearningModel.createLesson(tieuDe, moTa, duongDanFile, ngonNguLapTrinh, maNguoiTao, imagePath);
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
            let imagePath = null;

            if (req.files) {
                if (req.files.inputFile && req.files.inputFile[0]) {
                    duongDanFile = `/uploads/lessons/${req.files.inputFile[0].filename}`;
                    
                    // Xóa file cũ nếu có
                    const lesson = await LearningModel.getLessonById(maBaiHoc);
                    if (lesson && lesson.DuongDanFile) {
                        const oldFilePath = path.join(__dirname, '..', 'public', lesson.DuongDanFile);
                        if (fs.existsSync(oldFilePath)) {
                            fs.unlinkSync(oldFilePath);
                        }
                    }
                }
                
                if (req.files.imageFile && req.files.imageFile[0]) {
                    imagePath = `/uploads/images/${req.files.imageFile[0].filename}`;
                    
                    // Xóa ảnh cũ nếu có
                    const lesson = await LearningModel.getLessonById(maBaiHoc);
                    if (lesson && lesson.Image && lesson.Image !== '/public/images/img/defaultLesson.png') {
                        const oldImagePath = path.join(__dirname, '..', 'public', lesson.Image);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                }
            }

            await LearningModel.updateLesson(maBaiHoc, tieuDe, moTa, duongDanFile, ngonNguLapTrinh, imagePath);
            res.redirect(`/learning/${maBaiHoc}/details`);
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

    async updateMarkdown(req, res) {
        try {
            // Kiểm tra quyền Admin
            if (!req.session.user || req.session.user.vaiTro !== 'Admin') {
                return res.status(403).json({ error: 'Không có quyền truy cập' });
            }

            const maBaiHoc = req.params.id;
            const { content } = req.body;

            // Lấy thông tin bài học
            const lesson = await LearningModel.getLessonById(maBaiHoc);
            if (!lesson) {
                return res.status(404).json({ error: 'Không tìm thấy bài học' });
            }

            // Kiểm tra xem có file markdown không
            if (!lesson.DuongDanFile || !lesson.DuongDanFile.endsWith('.md')) {
                return res.status(400).json({ error: 'Bài học này không phải file markdown' });
            }

            // Ghi nội dung mới vào file
            const filePath = path.join(__dirname, '..', 'public', lesson.DuongDanFile);
            fs.writeFileSync(filePath, content, 'utf8');

            res.json({ success: true, message: 'Đã cập nhật nội dung markdown' });
        } catch (error) {
            console.error('Lỗi khi cập nhật markdown:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật file' });
        }
    }
}

module.exports = new LearningController();