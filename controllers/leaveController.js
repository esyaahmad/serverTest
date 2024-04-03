const { LeaveReport, User } = require("../models");
class leaveController {
  static async addLeaveRequest(req, res, next) {
    try {
      // console.log(req.body);
      const { userId } = req.loginInfo;

      const { name, description, department, startDate, endDate } = req.body;
      // Start and end dates
      var newStartDate = new Date(startDate);
      var newEndDate = new Date(endDate);

      // Calculate the difference in milliseconds
      var timeDifference = newEndDate.getTime() - newStartDate.getTime();

      // Convert milliseconds to days
      var totalDays = Math.abs(timeDifference / (1000 * 3600 * 24) + 1);
      const lR = await LeaveReport.create({
        name,
        description,
        department,
        startDate,
        endDate,
        total: totalDays,
        userId,
      });
      res.status(201).json(lR);
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "ValidationErrorItems"
      ) {
        // status = 400
        // message =  error.errors.map((err) => err.message)[0]
        res
          .status(400)
          .json({ message: error.errors.map((err) => err.message, "error") });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getLeaveReports(req, res, next) {
    try {
      const reports = await LeaveReport.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: { model: User },
      });
      res.status(200).json({ reports });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = leaveController;
