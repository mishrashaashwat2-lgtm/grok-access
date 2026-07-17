// =====================================
// GROK ACCESS v6.1
// script.js
// PART 1
// =====================================

function getUsers() {

    let data = localStorage.getItem("grok_users");

    if (data !== null) {
        return JSON.parse(data);
    }

    localStorage.setItem(
        "grok_users",
        JSON.stringify(users)
    );

    return JSON.parse(
        localStorage.getItem("grok_users")
    );

}

function saveUsers(db) {

    localStorage.setItem(
        "grok_users",
        JSON.stringify(db)
    );

}

function login() {

    const token =
        document.getElementById("token").value.trim();

    const password =
        document.getElementById("password").value;

    const db = getUsers();

    if (!db[token]) {

        alert("Invalid Token ID");
        return;

    }

    if (db[token].password !== password) {

        alert("Incorrect Password");
        return;

    }

    localStorage.setItem(
        "currentUser",
        token
    );

    if (db[token].firstLogin === true) {

        window.location.href =
            "change-password.html";

        return;

    }

    window.location.href =
        "dashboard.html";

}
// =====================================
// GROK ACCESS v6.1
// PART 2
// =====================================

function changePassword() {

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword.length < 8) {

        alert("Password must contain at least 8 characters.");
        return;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }

    const token =
        localStorage.getItem("currentUser");

    if (!token) {

        alert("Session expired.");
        window.location.href = "login.html";
        return;

    }

    const db = getUsers();

    db[token].password = newPassword;
    db[token].firstLogin = false;

    saveUsers(db);

    alert("Password updated successfully.");

    window.location.href = "dashboard.html";

}

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

}

function resetPortalData() {

    if (!confirm("Reset all portal data?")) {

        return;

    }

    localStorage.removeItem("grok_users");
    localStorage.removeItem("currentUser");

    alert("Portal reset completed.");

    location.reload();

}
// =====================================
// GROK ACCESS v6.1
// PART 3
// =====================================

function loadDashboard() {

    const token = localStorage.getItem("currentUser");

    if (!token) {

        window.location.href = "login.html";
        return;

    }

    const db = getUsers();

    if (!db[token]) {

        alert("User not found.");
        logout();
        return;

    }

    const user = db[token];

    document.getElementById("user-name").innerText = user.name;
    document.getElementById("user-role").innerText = user.role;
    document.getElementById("user-clearance").innerText = user.clearance;
    document.getElementById("user-status").innerText = user.status;
    document.getElementById("user-serial").innerText = user.serial;

    const badge = document.getElementById("role-badge");

    badge.className = "badge";

    switch (user.theme) {

        case "gold":

            document.body.className = "gold-theme";
            badge.classList.add("admin-badge");
            badge.innerText = "👑 ADMINISTRATOR";
            break;

        case "blue":

            document.body.className = "blue-theme";
            badge.classList.add("coadmin-badge");
            badge.innerText = "🛡 CO-ADMINISTRATOR";
            break;

        case "purple":

            document.body.className = "purple-theme";
            badge.classList.add("developer-badge");
            badge.innerText = "💻 UI DEVELOPER";
            break;

        default:

            document.body.className = "green-theme";
            badge.classList.add("member-badge");
            badge.innerText = "👤 MEMBER";

    }

}
// =====================================
// GROK ACCESS v6.1
// PART 4
// =====================================

function openModal(title, text) {

    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-text").innerText = text;

    document.getElementById("modal").style.display = "flex";

}

function closeModal() {

    document.getElementById("modal").style.display = "none";

}

function showMembers() {

    const db = getUsers();

    let list = "";

    for (let token in db) {

        list +=
            db[token].name +
            " • " +
            db[token].role +
            "\n";

    }

    openModal(
        "👥 Registered Members",
        list
    );

}

function showNotifications() {

    openModal(

        "🔔 Notifications",

        "• Welcome to GROK ACCESS\n\n" +
        "• Authentication System v6.1 Active\n\n" +
        "• Portal running normally."

    );

}

function showSystemStatus() {

    openModal(

        "📊 System Status",

        "Status : ONLINE\n\n" +
        "Security : ACTIVE\n\n" +
        "Authentication : ENABLED\n\n" +
        "Database : CONNECTED\n\n" +
        "Version : " + CONFIG.version

    );

}

function showProfile() {

    const db = getUsers();

    const user =
        db[localStorage.getItem("currentUser")];

    openModal(

        "🪪 My Profile",

        "Name : " + user.name +

        "\n\nRole : " + user.role +

        "\n\nClearance : " + user.clearance +

        "\n\nStatus : " + user.status +

        "\n\nSerial : " + user.serial

    );

}

function showWebsite() {

    window.open(
        CONFIG.website,
        "_blank"
    );

}

function showSettings() {

    openModal(

        "⚙ Settings",

        "Coming Soon\n\n" +

        "• Change Password\n" +

        "• Forgot Password\n" +

        "• Dark/Light Theme\n" +

        "• Security Options\n" +

        "• Account Preferences"

    );

}

// =====================================
// END OF FILE
// =====================================
