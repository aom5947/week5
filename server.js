const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// ตั้งค่าการจัดเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // เก็บไฟล์ในโฟลเดอร์ uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // ใช้ชื่อไฟล์เดิม
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Login (dummy authentication)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "password123") {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});
