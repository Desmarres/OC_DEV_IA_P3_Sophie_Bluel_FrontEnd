/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne la partie login. 
 * 
 *********************************************************************************/

import { validateEmail, validatePassword } from "../services/data.js";
import { postLogin } from "../services/api.js";
import { redirectPage } from "./auth.js";

/**
 * Cette fonction initilaise les écouteurs et les actions 
 * des différents champs et bouton du formulaire
 */
export function loginForm() {

    // Récupération de la balise form
    let form = document.querySelector("#login form");

    // Récupération des champs du formulaire
    let inputEmail = document.querySelector("#email");
    let inputPassword = document.querySelector("#password");

    // initialisation des écouteurs sur les inputs et sur la validation du formulaire
    emailInputControl(inputEmail);
    passwordInputControl(inputPassword);
    // appelle la fonction de gestion du formulaire de connexion
    form.addEventListener("submit", (event) => formValidationManagement(event, inputEmail, inputPassword));
}

/**
 * Cette fonction contrôle le champ de saisie email et modifie le CSS suivant la validité de la saisie
 * @param {HTMLElement} inputPassword 
 */
function emailInputControl(inputEmail) {

    /* On écoute quand le visiteur sort du champ de saisie et on vérifie que l'email est valide
    Si oui, on enlève la classe error
    Si non, on ajoute la classe error */
    inputEmail.addEventListener("focusout", () =>
        validateEmail(inputEmail.value)
            ? inputEmail.classList.remove("error")
            : inputEmail.classList.add("error"));
}

/**
 * Cette fonction contrôle le champ de saisie password et modifie le CSS suivant la validité de la saisie
 * @param {HTMLElement} inputPassword 
 */
function passwordInputControl(inputPassword) {

    /* On écoute quand le visiteur sort du champ de saisie et on vérifie que l'email est valide
    Si oui, on enlève la classe error
    Si non, on ajoute la classe error */
    inputPassword.addEventListener("focusout", () =>
        validatePassword(inputPassword.value)
            ? inputPassword.classList.remove("error")
            : inputPassword.classList.add("error"));
}

/**
 * Cette fonction gère la validation du formulaire
 * Elle vérifie les entrées et envoie la requête au serveur pour authentifier le visiteur
 * Si l'authentification est valide, il y a redirection vers la page d'accueil et 
 * enregistrement des éléments d'identification dans le LocalStorage.
 * Sinon elle appelle la focntion qui affiche le message d'erreur
 * @param {HTMLElement} form 
 * @param {HTMLElement} inputEmail 
 * @param {HTMLElement} inputPassword 
 */
async function formValidationManagement(event, inputEmail, inputPassword) {

    // annulation du comprtement par défaut
    event.preventDefault();

    // vérification des éléments du formulaire avant envoi au serveur
    if (validateEmail(inputEmail.value) && validatePassword(inputPassword.value)) {

        // récupération de la réponse du serveur
        const userConnexion = await postLogin(inputEmail.value, inputPassword.value)

        if (userConnexion.status === 200) {
            //Stockage des information dans le localStorage
            window.localStorage.setItem("userId", userConnexion.message.userId);
            window.localStorage.setItem("token", userConnexion.message.token);

            // Réinitialisation des champs du formulaire
            inputEmail.value = "";
            inputPassword.value = "";

            // Fonction de redirection de la page
            redirectPage("login.html", "index.html")
        } else {
            // Fonction qui affiche le message d'erreur
            loginError()
        }


    }
}

/**
 * Cette fonction initialise l'affichage du message d'erreur d'authentification
 */
function loginError() {

    // Récupération de la balise h2
    let titreElement = document.querySelector("#login h2");

    // récupération de la balise du paragraphe erreur
    let paragrapheElement = document.querySelector(".errorLogin");

    // si la balise n'éxiste pas on va la créer
    if (!paragrapheElement) {
        // Création du la balise p et attribution de ses classes
        let paragrapheElement = document.createElement("p");
        paragrapheElement.classList.add('error');
        paragrapheElement.classList.add('errorLogin');
        // Attribution du message d'erreur
        paragrapheElement.textContent = "Adresse e-mail ou mot de passe incorrect.";

        // on ajoute le paragraphe après le titre h2
        titreElement.insertAdjacentElement("afterend", paragrapheElement);
    }
}
