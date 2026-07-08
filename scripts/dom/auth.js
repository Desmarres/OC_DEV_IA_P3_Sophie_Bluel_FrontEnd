/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne l'authentification. 
 * 
 *********************************************************************************/


import { changeClass } from "./ui.js";
import { addBlackBarEditMode, removeBlackBarEditMode } from "./ui.js";
import { generateEditElement, removeEditElement } from "./modal/modal.js";
import { login, logout } from "../config/constants.js";

/**
 * Cette fonction remplace le nom de la page actuelle par le nom de la page renseignée 
 * en paramètre. Puis elle effectue une redirection au niveau du navigateur.
 * Les deux fichiers html doivent être dans le même dossier.
 * @param {string} currentPage : Nom du fichier correspondant à la page actuelle.
 * @param {string} targetPage : Nom du fichier correspondant à la page cible.
 */
export function redirectPage(currentPage, targetPage) {
    // on récupère l'URL actuelle de la page
    let currentAddress = document.URL;
    // on récupère la position du dernier slash
    let indexLastSlash = currentAddress.lastIndexOf("/");
    // on récupère le chemin actuel de la page
    let currentPath = currentAddress.slice(0, indexLastSlash + 1);

    // on réécrit de l'adresse cible
    let targetAddress = currentPath + targetPage;

    // on redirige la page vers l'adresse cible
    document.location.assign(targetAddress);
}


/**
 * Cette fonction gère la connexion et écoute le clik sur le lien login/logout et 
 * pointe vers login.html ou 
 * reste sur la page et supprime le token du localStorage
 * @param {string} currentPage : nom de la page actuelle
 */

export function logManagement(currentPage) {

    // On récupère le token s'il est présent
    let token = window.localStorage.getItem("token");

    // on récupère le lien login/logout
    const lienLog = document.querySelector("header .js-log");

    // si nous avons un token, nous sommes connecté
    if (token !== null) {
        console.log("Connected");
        // si nous sommes sur l'index, nous appelons 
        // la fonction qui génère le liens vers l'édition
        if (currentPage === "index.html") generateEditElement();
        // on appelle la fonction qui ajoute la bar mode Edition en haut de la page
        addBlackBarEditMode()
        // nous modifions le texte login en logout et les class associées
        changeClass(lienLog, login.class, logout.class, logout.texte);
    }

    // on écoute le click sur le lien login/logout
    lienLog.addEventListener("click", (event) => {
        event.preventDefault();
        // si nous n'étions pas connecté, nous nous redirigeons vers la page login.html
        if (lienLog.classList.contains(login.class)) {
            redirectPage(currentPage, "login.html");
        } else {
            // sinon si nous sommes sur la page index.html, nous supprimons le liens 
            // vers l'édition
            if (currentPage === "index.html") removeEditElement();
            // on appelle la fonction qui retire la bar mode Edition en haut de la page
            removeBlackBarEditMode()
            // nous vidons les éléments token et id du localStorage
            localStorage.clear();
            console.log("Disconnected");
            // nous modifions le texte logout en login et les class associées
            changeClass(lienLog, logout.class, login.class, login.texte);
        }
    })


}
