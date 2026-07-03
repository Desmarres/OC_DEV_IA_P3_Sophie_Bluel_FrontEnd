import { loginForm } from "../dom/login.js";
import { logManagement } from "../dom/auth.js"

/* ------------ GESTION DU FORMULAIRE ------------ */

// Appel de la fonction qui gère le formulaire
loginForm();

/* ------------ GESTION DE LA CONNEXION ------------ */

// on appelle la fonction qui gère le lien login/logout
// en lui précisant la page actuelle
logManagement("login.html");