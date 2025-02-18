document.addEventListener("DOMContentLoaded", () => {
    fetchFiles(); // เรียกใช้งานเมื่อโหลดหน้าเว็บ
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("login-section").style.display = "none";
                document.getElementById("app-section").style.display = "block";
            } else {
                alert("Login failed: " + data.message);
            }
        })
        .catch(error => alert("Error: " + error));
    } else {
        alert("Please enter both username and password");
    }
}

function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("File uploaded successfully");
            fetchFiles(); // รีเฟรชรายชื่อไฟล์
        }
    })
    .catch(error => console.error("Error uploading file:", error));
}

function fetchFiles() {
    fetch("http://localhost:3000/files")
    .then(response => response.json())
    .then(files => {
        const fileList = document.getElementById("fileList");
        fileList.innerHTML = ""; // ล้างรายการไฟล์ที่เก่าออก
        files.forEach(file => {
            const li = document.createElement("li");
            li.innerHTML = ${file} 
                <button onclick="downloadFile('${file}')">Download</button>
                <button onclick="deleteFile('${file}')">Delete</button>;
            fileList.appendChild(li);
        });
    });
}

function downloadFile(filename) {
    window.location.href = http://localhost:3000/download/${filename};
}

function deleteFile(filename) {
    if (confirm("Are you sure you want to delete this file?")) {
        fetch(http://localhost:3000/delete/${filename}, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("File deleted successfully");
                fetchFiles(); // รีเฟรชรายชื่อไฟล์
            }
        })
        .catch(error => console.error("Error deleting file:", error));
}
}
