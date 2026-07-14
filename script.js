// GROK ACCESS v6.0
// Part 1

function getUsers() {

    let saved = localStorage.getItem("grok_users");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "grok_users",
        JSON.stringify(users)
    );

    return JSON.parse(
        localStorage.getItem("grok_users")
    );

}

function saveUsers(updatedUsers) {

    localStorage.setItem(
        "grok_users",
        JSON.stringify(updatedUsers)
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

    if (db[token].firstLogin) {

        window.location =
            "change-password.html";

        return;

    }

    window.location =
        "dashboard.html";

}
// GROK ACCESS v6.0
// Part 2

function changePassword() {

    const password =
        document.getElementById("newPassword").value;

    const confirm =
        document.getElementById("confirmPassword").value;

    if (password.length < 8) {

        alert("Password must be at least 8 characters.");

        return;

    }

    if (password !== confirm) {

        alert("Passwords do not match.");

        return;

    }

    const token =
        localStorage.getItem("currentUser");

    const db =
        getUsers();

    db[token].password = password;

    db[token].firstLogin = false;

    saveUsers(db);

    alert("Password changed successfully!");

    window.location = "dashboard.html";

}

function loadDashboard() {

    const token =
        localStorage.getItem("currentUser");

    if (!token) {

        window.location = "login.html";

        return;

    }

    const db =
        getUsers();

    const user =
        db[token];

    document.getElementById("user-name").innerText =
        user.name;

    document.getElementById("user-role").innerText =
        user.role;

    document.getElementById("user-clearance").innerText =
        user.clearance;

    document.getElementById("user-status").innerText =
        user.status;

    document.getElementById("user-serial").innerText =
        user.serial;

    const badge =
        document.getElementById("role-badge");

    badge.innerText = user.role;

    badge.className = "badge";

    switch(user.theme){

        case "gold":
            document.body.classList.add("gold-theme");
            badge.classList.add("admin-badge");
            break;

        case "blue":
            document.body.classList.add("blue-theme");
            badge.classList.add("coadmin-badge");
            break;

        case "purple":
            document.body.classList.add("purple-theme");
            badge.classList.add("developer-badge");
            break;

        default:
            document.body.classList.add("green-theme");
            badge.classList.add("member-badge");

    }

}

function logout(){

    localStorage.removeItem("currentUser");

    window.location = "index.html";

}

function openModal(title,text){

    document.getElementById("modal-title").innerText=title;

    document.getElementById("modal-text").innerText=text;

    document.getElementById("modal").style.display="flex";

}

function closeModal(){

    document.getElementById("modal").style.display="none";

}

function showMembers(){

    openModal(

        "Members",

`Administrator
Co-Administrator
UI Developer
Members`

    );

}

function showNotifications(){

    openModal(

        "Notifications",

        "No new notifications."

    );

}

function showSystemStatus(){

    openModal(

        "System Status",

        "🟢 GROK ACCESS is ONLINE"

    );

}

function showProfile(){

    const db=getUsers();

    const user=db[localStorage.getItem("currentUser")];

    openModal(

        "My Profile",

        user.name +
        "\n\nRole: " + user.role +
        "\nClearance: " + user.clearance +
        "\nStatus: " + user.status

    );

}

function showWebsite(){

    window.open(CONFIG.website,"_blank");

}

function showSettings(){

    openModal(

        "Settings",

        "Settings module coming in Version 6.1"

    );

}
function resetPortalData(){

    if(!confirm("Reset all portal data?")){
        return;
    }

    localStorage.removeItem("grok_users");
    localStorage.removeItem("currentUser");

    alert("Portal data has been reset.");

    location.reload();

}
