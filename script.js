// script.js — Smart Campus Platform

// Student login button
function studentLogin() {
  const username = prompt("Enter Student Username:");
  const password = prompt("Enter Password:");

  if (username && password) {
    alert("✅ Student Login Successful");
    document.getElementById("welcomeText").innerText =
      "Welcome, " + username + " 👋";
  } else {
    alert("❌ Login Failed. Please enter valid details.");
  }
}

// Faculty login button
function facultyLogin() {
  const username = prompt("Enter Faculty Username:");
  const password = prompt("Enter Password:");

  if (username && password) {
    alert("✅ Faculty Login Successful");
    document.getElementById("welcomeText").innerText =
      "Welcome Professor " + username + " 👨‍🏫";
  } else {
    alert("❌ Login Failed");
  }
}

// Attendance module
function openAttendance() {
  alert("📊 Attendance Module\n\nPresent: 85%\nAbsent: 15%");
}

// Notices module
function openNotices() {
  alert("📢 Latest Notices:\n\n1. Exam from 10th June\n2. Submission Deadline - 15th June");
}

// Profile module
function openProfile() {
  alert("👤 Profile Settings:\n\nName: Student\nDepartment: CSE\nStatus: Active");
}

// Dark mode toggle
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.innerText = "☀️ Light Mode";
  } else {
    darkModeBtn.innerText = "🌙 Dark Mode";
  }
});

// Hero animation
const hero = document.querySelector(".hero");
hero.style.opacity = 0;

setTimeout(() => {
  hero.style.transition = "all 1.5s ease-in";
  hero.style.opacity = 1;
}, 300);

