// CREATE SERVER
const express = require("express");
const app = express();
const _PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const bcrypt = require("bcrypt");
// CONNECT TO DB
const username = process.env.USERNAME,
  password = process.env.PASSWORD,
  database = process.env.DB;

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.do1oqjg.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
);

// USER MODEL
const UserModel = require("./models/Users");

// get request
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// create user
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(req.body);
});

// ADMIN MODEL
const AdminModel = require("./models/Admins");
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminModel.findOne({ username });

  if (admin) {
    return res.json({ message: "Admin already exists!" });
  }

  const newAdmin = new AdminModel({
    username: username,
    password: password,
  });

  await newAdmin.save();

  return res.json({ message: "Admin created succefully" });

  //   admin && res.json({ message: "Admin already exists!" });

  //   const hashedPassword = bcrypt.hashSync(password, 10);

  //   const newAdmin = new AdminModel({
  //     username,
  //     password: hashedPassword,
  //   });

  //   await newAdmin.save();
  //   return res.json({ message: "Admin created succefully" });
});

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const admin = await AdminModel.findOne({ username });
//   !admin && res.json({ message: "Admin doesn't exists!" });
// });

// const isPasswordValid = await bcrypt.compare(password, admin.password);

// !isPasswordValid &&
//   res.json({ message: "Username or Password is not correct" });

app.listen(_PORT, () => {
  console.log("Server Works");
});
