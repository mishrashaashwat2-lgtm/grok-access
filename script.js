// ==============================
// GROK ACCESS v5.0
// Main Script
// ==============================

let currentUser = null;

// ------------------------------
// LOGIN
// ------------------------------

function login() {

    const token = document.getElementById("token").value.trim().toUpperCase();
    const password = document.getElementById("password").value.trim();

    if (!users[token]) {
        alert("Invalid Token ID");
        return;
    }

    if (users[token].password !== password) {
        alert("Incorrect Password");
        return;
    }

    sessionStorage.setItem("loggedUser", token);

    window.location.href = "dashboard.html";

}

// ------------------------------
// LOAD DASHBOARD
// ------------------------------

function loadDashboard() {

    const token = sessionStorage.getItem("loggedUser");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    currentUser = users[token];

    document.getElementById("user-name").textContent = currentUser.name;
    document.getElementById("user-role").textContent = currentUser.role;
    document.getElementById("user-clearance").textContent = currentUser.clearance;
    document.getElementById("user-status").textContent = currentUser.status;
    document.getElementById("user-serial").textContent = currentUser.serial;

    applyTheme(currentUser.theme);

    setRoleBadge();

}

// ------------------------------
// ROLE BADGE
// ------------------------------

function setRoleBadge(){

    const badge = document.getElementById("role-badge");

    badge.className = "badge";

    switch(currentUser.role){

        case "ADMINISTRATOR":

            badge.classList.add("admin-badge");
            badge.innerHTML="👑 ADMINISTRATOR";
            break;

        case "CO-ADMINISTRATOR":

            badge.classList.add("coadmin-badge");
            badge.innerHTML="🛡 CO-ADMINISTRATOR";
            break;

        case "UI DEVELOPER":

            badge.classList.add("developer-badge");
            badge.innerHTML="💻 UI DEVELOPER";
            break;

        default:

            badge.classList.add("member-badge");
            badge.innerHTML="👤 MEMBER";

    }

}

// ------------------------------
// THEMES
// ------------------------------

function applyTheme(theme){

    document.body.classList.remove(
        "gold-theme",
        "blue-theme",
        "purple-theme",
        "green-theme"
    );

    switch(theme){

        case "gold":
            document.body.classList.add("gold-theme");
            break;

        case "blue":
            document.body.classList.add("blue-theme");
            break;

        case "purple":
            document.body.classList.add("purple-theme");
            break;

        default:
            document.body.classList.add("green-theme");

    }

}
// ==============================
// MODAL FUNCTIONS
// ==============================

function showModal(title, text){

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");

    modalTitle.innerHTML = title;
    modalText.innerHTML = text;

    modal.style.display = "flex";
}

function closeModal(){

    document.getElementById("modal").style.display = "none";

}

// ==============================
// DASHBOARD BUTTONS
// ==============================

function showMembers(){

    let html = "";

    for(const token in users){

        const u = users[token];

        html += `
        <b>${u.name}</b><br>
        Token : ${token}<br>
        Role : ${u.role}<br>
        Clearance : ${u.clearance}<br>
        Status : ${u.status}
        <hr>
        `;

    }

    showModal("👥 MEMBER DIRECTORY", html);

}

function showSystemStatus(){

    showModal(
        "📊 SYSTEM STATUS",
        `
        <b>Portal</b><br>${CONFIG.portalName}<br><br>

        <b>Version</b><br>${CONFIG.version}<br><br>

        <b>Organization</b><br>${CONFIG.organization}<br><br>

        <b>Status</b><br>${CONFIG.systemStatus}
        `
    );

}

function showProfile(){

    showModal(
        "🪪 MY PROFILE",
        `
        <b>Name</b><br>${currentUser.name}<br><br>

        <b>Role</b><br>${currentUser.role}<br><br>

        <b>Gender</b><br>${currentUser.gender}<br><br>

        <b>Clearance</b><br>${currentUser.clearance}<br><br>

        <b>Serial Number</b><br>${currentUser.serial}
        `
    );

}

function showNotifications(){

    showModal(
        "🔔 NOTIFICATIONS",
        `
        ✅ Welcome ${currentUser.name}<br><br>

        ✅ ${CONFIG.portalName} is online.<br><br>

        ✅ Security clearance verified.<br><br>

        ✅ Have a productive session.
        `
    );

}

function showSettings(){

    showModal(
        "⚙ SETTINGS",
        `
        Website<br>
        ${CONFIG.website}<br><br>

        Support<br>
        ${CONFIG.support}<br><br>

        Issue Date<br>
        ${CONFIG.issueDate}
        `
    );

}

function showWebsite(){

    window.open(CONFIG.website,"_blank");

}

// ==============================
// LOGOUT
// ==============================

function logout(){

    sessionStorage.removeItem("loggedUser");

    window.location.href="index.html";

}

// ==============================
// BACKGROUND ANIMATION
// ==============================

window.addEventListener("load",()=>{

    const canvas=document.getElementById("bg");

    if(!canvas) return;

    const ctx=canvas.getContext("2d");

    function resize(){

        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;

    }

    resize();

    window.addEventListener("resize",resize);

    const particles=[];

    for(let i=0;i<140;i++){

        particles.push({

            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            r:Math.random()*2+1,
            s:Math.random()*0.8+0.2

        });

    }

    function animate(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle="#00ffe7";

        particles.forEach(p=>{

            p.y+=p.s;

            if(p.y>canvas.height){

                p.y=0;
                p.x=Math.random()*canvas.width;

            }

            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fill();

        });

        requestAnimationFrame(animate);

    }

    animate();

});
