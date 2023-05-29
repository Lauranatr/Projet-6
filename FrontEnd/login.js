const formLog = document.getElementById("login")
const password = document.getElementById("password")
let user = {
    email: email,
    password: password
}

async function postLog(email,password) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
}

formLog.addEventListener('submit', async function(event){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        const data = await response.json();
        // window.location.href = './index.html';    
    } else {
        const messageErreur = document.getElementById("wrong");
        messageErreur.innerHTML = `Erreur dans l'identifiant ou le mot de passe`
    }
    
});