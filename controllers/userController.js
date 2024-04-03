const { signToken } = require("../helpers/jwt");
const { compare } = require("../helpers/toBcrypt");
const { User } = require("../models/index");
const { LeaveBalance } = require("../models/index");


class userController {
  static async login(req, res, next) {
    try {
      const { name, password } = req.body;

      if (!name) {
        throw { name: "NameIsRequired" };
      }
      if (!password) {
        throw { name: "PasswordIsRequired" };
      }

      const user = await User.findOne({ where: { name } });
      if (!user) {
        throw { name: "NotFound" };
      }

      const isPasswordMatch = compare(password, user.password);

      if (!isPasswordMatch) {
        throw { name: "InvalidNamePassword" };
      }

      const payload = {
        // data2 yang mau kita simpan
        id: user.id,
        name: user.name,
        role: user.role,
        department: user.department,
      };

      // console.log(payload);
      const access_token = signToken(payload);
      // res.status(200).json({message : 'success login'})
      res.status(200).json({ access_token: access_token });
    } catch (error) {
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
      } else if (error.name === "NameIsRequired") {
        // status = 400
        // message = 'email is required'
        res.status(400).json({ message: "name is required" });
      } else if (error.name === "PasswordIsRequired") {
        // status = 400
        // message = 'password is required'
        res.status(400).json({ message: "password is required" });
      } else if (error.name === "NotFound") {
        // status = 404
        // message = 'Not found'
        res.status(404).json({ message: "Cuisine not found" });
      } else if (error.name === "InvalidNamePassword") {
        // status = 401
        // message = 'Invalid email/password'
        res.status(401).json({ message: "Invalid name/password" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async addUser(req, res, next) {
    try {
      const { name, password, nik, department, role } = req.body;
      const user = await User.create({ name, password, nik, department, role });
      res.status(201).json({
        //   id: user.id,
        name: user.name,
        nik: user.nik,
        department: user.department,
        role: user.role,
      });
    } catch (error) {
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

  static async getUsers(req,res,next) {
    try {
        const users = await User.findAll({
            attributes: {exclude: ["password", 'createdAt', 'updatedAt']}, include: {model:LeaveBalance}
        })
        res.status(200).json({users})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


static async getUsersByDepartment(req,res,next) {
  try {
    const {department} = req.loginInfo

      const users = await User.findAll({
          attributes: {exclude: ["password", 'createdAt', 'updatedAt']},
          where: {
              department: department
          }
      })
      res.status(200).json({users})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}


static async getUsersByDepartmentSupervisor(req,res,next) {
  try {
    const {department} = req.loginInfo

      const users = await User.findAll({
          attributes: {exclude: ["password", 'createdAt', 'updatedAt']},
          where: {
              department: department,
              role: 'supervisor'
          }
      })
      res.status(200).json({users})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}

static async getUsersByDepartmentManager(req,res,next) {
  try {
    const {department} = req.loginInfo

      const users = await User.findAll({
          attributes: {exclude: ["password", 'createdAt', 'updatedAt']},
          where: {
              department: department,
              role: 'manager'
          }
      })
      res.status(200).json({users})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}

static async getUsersByIdLogin(req,res,next) {
  try {
    const {userId} = req.loginInfo

      const users = await User.findAll({
          attributes: {exclude: ["password", 'createdAt', 'updatedAt']},
          where: {
              id: userId
          }
      })
      res.status(200).json({users})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}
}

module.exports = userController;
