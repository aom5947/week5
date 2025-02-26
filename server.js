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

// Upload file
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.json({ success: true, filename: req.file.filename });
});

// Get file list
app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).send("Error reading files");
    res.json(files);
  });
});

// Download file
app.get("/download/:filename", (req, res) => {
  const file = path.join(__dirname, "uploads", req.params.filename);
  res.download(file);
});

// Delete file
app.delete("/delete/:filename", (req, res) => {
  const filePath = path.join("uploads", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("File not found");
    res.json({ success: true, message: "File deleted" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
