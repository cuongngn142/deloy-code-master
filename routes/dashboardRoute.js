const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

//render
router.get("/dashboard", dashboardController.renderDashboard);


router.get("/api/users/quantity", dashboardController.countAllUsers);
router.get("/api/exercise/quantity", dashboardController.countAllExercises);
router.get("/api/results/quantity", dashboardController.countSubmissionResult);
router.get("/api/results/programming-languages/quantity", dashboardController.countProgrammingLanguagesBySubmissionResult);
router.get("/api/topics/exercise-counts", dashboardController.countExercisesByTopic);


//user
router.get("/api/dashboard/users", dashboardController.getListUsers);
router.delete("/api/dashboard/users/:id", dashboardController.deleteUserById);
router.patch("/api/dashboard/users/:id", dashboardController.updateUserById);


module.exports = router;


/*
| Method | Mục đích                     | Dữ liệu gửi lên                    |
| ------ | ---------------------------- | ---------------------------------- |
| PUT    | Thay thế toàn bộ tài nguyên  | Gửi đầy đủ (toàn bộ)               |
| PATCH  | Cập nhật một phần tài nguyên | Gửi chỉ những trường muốn cập nhật |
*/