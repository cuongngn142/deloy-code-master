const LeaderboardModel = require('../models/leaderboardModel');

class LeaderboardController {
  async getLeaderboard(req, res) {
    try {
      const topUsers = await LeaderboardModel.getTopUsers();
      const otherUsers = await LeaderboardModel.getOtherUsers();

      // Kiểm tra nếu không có dữ liệu
      if (!topUsers || topUsers.length === 0) {
        return res.render('leaderboard', {
          topUsers: [],
          otherUsers: [],
          user: req.session.user,
          error: 'Chưa có dữ liệu xếp hạng'
        });
      }

      res.render('leaderboard', {
        topUsers,
        otherUsers,
        user: req.session.user,
        error: null
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu bảng xếp hạng:', error);
      res.status(500).render('error', {
        error: 'Đã xảy ra lỗi khi tải bảng xếp hạng',
        user: req.session.user
      });
    }
  }
}

module.exports = new LeaderboardController();