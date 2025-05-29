const dashboardModel = require("../models/dashboardModel");

const renderDashboard = (req, res) => {
  try {

    res.render("dashboard", { user: req.session.user || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countAllUsers = async (req, res) => {
  try {
    const quantityUser = await dashboardModel.countAllUsers();
    res.json(quantityUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countAllExercises = async (req, res) => {
  try {
    const quantity = await dashboardModel.countAllExercises();
    res.json(quantity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countExercisesByTopic = async (req, res) => {
  try {
    const listTopic = await dashboardModel.countExercisesByTopic();
    res.json(listTopic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countSubmissionResult = async (req, res) => {
  try {
    const quantity = await dashboardModel.countSubmissionResult();
    res.json(quantity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countProgrammingLanguagesBySubmissionResult = async (req, res) => {
  try {
    const quantityList =
      await dashboardModel.countProgrammingLanguagesBySubmissionResult();
    res.json(quantityList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListUsers = async (req, res) => {
  try {
    const listUser = await dashboardModel.getListUsers();
    res.json(listUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await dashboardModel.deleteUserById(userId);
    //do bên model đã viết tbao trả về nên ko cần xử lý nữa chỉ cần trả về json cho client
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    //{ HoTen, Email, VaiTro, NgayTao } dữ liệu cần trả về từ req.body còn id lấy tù params :id
    const userId = req.params.id;
    const data = req.body;
    const updateUser = await dashboardModel.updateUserById(userId, data);
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  renderDashboard,
  countAllUsers,
  countExercisesByTopic,
  countAllExercises,
  countSubmissionResult,
  countProgrammingLanguagesBySubmissionResult,
  getListUsers,
  deleteUserById,
  updateUserById,
};
