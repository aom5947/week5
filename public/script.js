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
