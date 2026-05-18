let connecter = JSON.parse(localStorage.getItem('connecter')) || false;

// On met a jour le header en fonction de l'etat de la connexion
function majNav() {
    const connexion = document.getElementById('lien-connexion');
    const inscription = document.getElementById('lien-inscription');
    const deconnexion = document.getElementById('lien-deconnexion');
    if (connecter) {
        connexion.style.display = 'none';
        inscription.style.display = 'none';
        deconnexion.style.display = 'inline';
    } else {
        connexion.style.display = 'inline';
        inscription.style.display = 'inline';
        deconnexion.style.display = 'none';
    }
}

function viderApp() {
    document.getElementById('app').innerHTML = '';
}

function home() {
    //initialiser la page d'accueil
    viderApp();
    const div = document.createElement('div');
    // Afficher un message de bienvenue différent selon que l'utilisateur est connecté ou non
    if (connecter) {
        const user = localStorage.getItem('userActif');
        div.innerHTML = `
            <h1>Bienvenue ${user} !</h1>
            <p>Vous êtes connecté.</p>
        `;
    } else {
        div.innerHTML = `
            <h1>Bienvenue sur notre site !</h1>
            <p>Veuillez vous inscrire ou vous connecter pour continuer.</p>
        `;
    }
    document.getElementById('app').appendChild(div);
}

function inscription() {
    viderApp();
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>Inscription</h2>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">S'inscrire</button>
        <p id="message" style="color:red;"></p>
    `;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
        utilisateurs.push({
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        });
        localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
        alert('Inscription réussie !');
        connexion();
    });

    document.getElementById('app').appendChild(form);
}

function connexion() {
    viderApp();
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>Connexion</h2>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Se connecter</button>
        <p id="message" style="color:red;"></p>
    `;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value;
        const message = form.querySelector('#message');

        const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
        const trouve = utilisateurs.find(u => u.username === username && u.password === password);

        if (!trouve) {
            message.textContent = "Identifiants incorrects.";
            return;
        }

        connecter = true;
        localStorage.setItem('connecter', 'true');
        localStorage.setItem('userActif', username);
        majNav();
        home();
    });

    document.getElementById('app').appendChild(form);
}

function deconnexion() {
    connecter = false;
    localStorage.setItem('connecter', 'false');
    localStorage.removeItem('userActif');
    majNav();
    home();
}

majNav();
home();
