// Etat de connexion de l'utilisateur, restauré depuis le localStorage
let connecter = localStorage.getItem('connecter') === 'true';

// On met a jour le header en fonction de l'etat de la connexion
function majNav() {
    document.getElementById('lien-connexion').style.display = connecter ? 'none' : 'inline';
    document.getElementById('lien-inscription').style.display = connecter ? 'none' : 'inline';
    document.getElementById('lien-deconnexion').style.display = connecter ? 'inline' : 'none';
}

// Page d'accueil : message different selon que l'utilisateur est connecte ou non
function home() {
    const user = localStorage.getItem('userActif');
    document.getElementById('app').innerHTML = connecter
        ? `<h1>Bienvenue ${user} !</h1><p>Vous êtes connecté.</p>`
        : `<h1>Bienvenue !</h1><p>Cliquez sur "Connexion" ou "Inscription" pour continuer.</p>`;
}

// Affiche le formulaire d'inscription et gere la soumission
function inscription() {
    document.getElementById('app').innerHTML = `
        <form id="form">
            <h2>Inscription</h2>
            <label>Nom d'utilisateur</label><input id="username" required>
            <label>Email</label><input type="email" id="email" required>
            <label>Mot de passe</label><input type="password" id="password" required>
            <label>Confirmation du mot de passe</label><input type="password" id="passwordConfirm" required>
            <button type="submit">Créer mon compte</button>
            <p id="message"></p>
            <p style="text-align:center; margin-top:12px;">
                <a href="#" id="lien-deja-compte" style="color: var(--text-p);">Déjà un compte ?</a>
            </p>
        </form>
    `;

    document.getElementById('lien-deja-compte').addEventListener('click', (e) => {
        e.preventDefault();
        connexion();
    });

    document.getElementById('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('message');
        message.style.color = '';
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        // Verifie que les deux mots de passe sont identiques avant d'appeler l'API
        if (password !== passwordConfirm) {
            return message.textContent = "La confirmation ne correspond pas au mot de passe.";
        }

        message.textContent = 'Chargement...';
        const res = await apiInscription(
            document.getElementById('username').value.trim(),
            document.getElementById('email').value.trim(),
            password
        );

        if (!res.ok) return message.textContent = res.erreur;
        message.style.color = 'lightgreen';
        message.textContent = 'Inscription réussie.';
        setTimeout(connexion, 1000);
    });
}

// Affiche le formulaire de connexion et gere la soumission
function connexion() {
    document.getElementById('app').innerHTML = `
        <form id="form">
            <h2>Connexion</h2>
            <label>Nom d'utilisateur</label>
            <input id="username" required>
            <label>Mot de passe</label>
            <input type="password" id="password" required>
            <button type="submit">Se connecter</button>
            <p id="message"></p>
        </form>
    `;

    document.getElementById('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('message');
        message.textContent = 'Chargement...';

        const res = await apiConnexion(
            document.getElementById('username').value.trim(),
            document.getElementById('password').value
        );

        if (!res.ok) return message.textContent = res.erreur;

        // On enregistre l'etat de connexion et on retourne a l'accueil
        connecter = true;
        localStorage.setItem('connecter', 'true');
        localStorage.setItem('userActif', res.username);
        majNav();
        home();
    });
}

// Deconnexion : on efface l'etat et on revient a l'accueil
function deconnexion() {
    connecter = false;
    localStorage.removeItem('connecter');
    localStorage.removeItem('userActif');
    majNav();
    home();
}

majNav();
home();
