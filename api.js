// Fausse API : gère seulement les données, pas l'affichage.

const delai = (ms) => new Promise(r => setTimeout(r, ms));
const getUsers = () => JSON.parse(localStorage.getItem('utilisateurs')) || [];
const setUsers = (u) => localStorage.setItem('utilisateurs', JSON.stringify(u));

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

async function apiConnexion(username, password) {
    await delai(500);
    const trouve = getUsers().find(u => u.username === username && u.password === password);
    if (!trouve) return { ok: false, erreur: 'Identifiants incorrects.' };
    return { ok: true, username: trouve.username };
}
