const express = require("express");
const app = express();
app.use(express.json());

let users = []; // simple in-memory database

// Home route
app.get("/", (req, res) => {
    res.send("Smart Campus Backend Running");
});

// Register user
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.json({ message: "Registered successfully" });
});

// Login user
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user });
});

app.listen(3000, () => console.log("Server running on port 3000"));
