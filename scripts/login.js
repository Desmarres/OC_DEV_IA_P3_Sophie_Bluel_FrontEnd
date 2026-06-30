import { loginForm, logEventListener } from "./dom.js";

/* ------------ GESTION DU FORMULAIRE ------------ */

// Appel de la fonction qui gère le formulaire
loginForm();

/* ------------ GESTION DE LA CONNEXION ------------ */

// on appelle la fonction qui gère le lien login/logout
// en lui précisant la page actuelle
logEventListener("login.html");