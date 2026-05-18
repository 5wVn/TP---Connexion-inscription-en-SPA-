// Fausse API : gère seulement les données, pas l'affichage

// Simule un delai reseau
const delai = (ms) => new Promise(r => setTimeout(r, ms));

// Lit et ecrit la liste des utilisateurs dans le localStorage
const getUsers = () => JSON.parse(localStorage.getItem('utilisateurs')) || [];
const setUsers = (u) => localStorage.setItem('utilisateurs', JSON.stringify(u));

// Inscription : verifie que l'email n'existe pas deja puis enregistre l'utilisateur
async function apiInscription(username, email, password) {
    await delai(500);
    const users = getUsers();
    if (users.some(u => u.email === email)) {
        return { ok: false, erreur: 'Un compte existe déjà avec cet email.' };
    }
    users.push({ username, email, password });
    setUsers(users);
    return { ok: true };
}

// Connexion : cherche un utilisateur correspondant au nom et au mot de passe
async function apiConnexion(username, password) {
    await delai(500);
    const trouve = getUsers().find(u => u.username === username && u.password === password);
    if (!trouve) return { ok: false, erreur: 'Identifiants incorrects.' };
    return { ok: true, username: trouve.username };
}
