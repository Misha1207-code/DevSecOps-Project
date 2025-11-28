const API_URL = "http://13.235.31.0:3000";

// ---------- MODAL HANDLERS ----------
function openLoginModal() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

function openRegisterModal() {
    document.getElementById("registerModal").style.display = "flex";
}

function closeRegisterModal() {
    document.getElementById("registerModal").style.display = "none";
}

function switchToRegister() {
    closeLoginModal();
    openRegisterModal();
}

function switchToLogin() {
    closeRegisterModal();
    openLoginModal();
}

// ---------- BACKEND API ----------
async function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message.includes("success")) {
        closeRegisterModal();
    }
}

async function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message.includes("successful")) {
        closeLoginModal();
    }
}
