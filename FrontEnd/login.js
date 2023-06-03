const btnSubmit = document.getElementById("submit")


async function postLog(email, password) {
    const req = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const response = await req.json();
    return response;
}

btnSubmit.addEventListener('click', async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        const login = await postLog(email, password);
        const token = login.token;

        if (token) {
            sessionStorage.setItem("token", token)
            location.replace("./index.html");
        }

    } else {
        const messageErreur = document.getElementById("wrong");
        messageErreur.innerHTML = `Erreur dans l'identifiant ou le mot de passe`
    }
});