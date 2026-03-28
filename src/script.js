let dragged = null;
let total = 5;

// 🔒 รหัสผ่านที่กำหนด
const ADMIN_PASSWORD = "Tepleela498816";

const scoreText = document.getElementById("score");
const bar = document.getElementById("bar");

// ลาก
document.querySelectorAll('.text-box').forEach(item => {
    item.addEventListener('dragstart', function() {
        dragged = this;
    });
});

// วาง
document.querySelectorAll('.img-box').forEach(box => {

    box.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    box.addEventListener('drop', function() {

        if (!dragged) return;

        let old = box.querySelector('.text-box');
        if (old) {
            document.querySelector('.texts').appendChild(old);
        }

        box.appendChild(dragged);
        dragged = null;
    });

});

// ตรวจ + บันทึก
function checkAnswer() {

    let score = 0;

    let name = document.getElementById("name").value;
    let classroom = document.getElementById("classroom").value;
    let number = document.getElementById("number").value;

    if (name === "" || classroom === "" || number === "") {
        alert("กรุณากรอกข้อมูลให้ครบ!");
        return;
    }

    document.querySelectorAll('.img-box').forEach(box => {

        let item = box.querySelector('.text-box');

        if (item && item.dataset.match === box.dataset.match) {
            box.style.border = "4px solid green";
            score+=2;
        } else {
            box.style.border = "4px solid red";
        }

    });

    scoreText.textContent = score;
    bar.style.width = (score / total * 100) + "%";

    // บันทึก
    let data = {
        name: name,
        classroom: classroom,
        number: number,
        score: score
    };

    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(data);
    localStorage.setItem("results", JSON.stringify(results));

    alert("บันทึกคะแนนเรียบร้อย!");
}

// แสดงผล
function showResults() {

    let results = JSON.parse(localStorage.getItem("results")) || [];

    let html = "<table border='1' style='margin:20px auto; color:white; text-align:center'>";
    html += "<tr><th>ชื่อ</th><th>ชั้น</th><th>เลขที่</th><th>คะแนน</th></tr>";

    results.forEach(r => {
        html += `<tr>
            <td>${r.name}</td>
            <td>${r.classroom}</td>
            <td>${r.number}</td>
            <td>${r.score}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("resultArea").innerHTML = html;
}

// 🔒 ล้างข้อมูล (มีรหัส)
function clearResults() {

    let pass = document.getElementById("adminPass").value;

    if (pass === ADMIN_PASSWORD) {
        localStorage.removeItem("results");
        document.getElementById("resultArea").innerHTML = "";
        alert("✅ ล้างข้อมูลเรียบร้อย");

        // เคลียร์ช่องรหัส
        document.getElementById("adminPass").value = "";
    } else {
        alert("❌ รหัสไม่ถูกต้อง!");
    }
}

// เปิด popup
function openPopup() {
    document.getElementById("passwordPopup").style.display = "block";
}

// ปิด popup
function closePopup() {
    document.getElementById("passwordPopup").style.display = "none";
    document.getElementById("adminPass").value = "";
}

// ยืนยันล้าง
function confirmClear() {

    let pass = document.getElementById("adminPass").value;

    if (pass === ADMIN_PASSWORD) {
        localStorage.removeItem("results");
        document.getElementById("resultArea").innerHTML = "";
        alert("✅ ล้างข้อมูลเรียบร้อย");
        closePopup();
    } else {
        alert("❌ รหัสไม่ถูกต้อง!");
    }
}