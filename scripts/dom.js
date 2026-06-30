/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à la manipulation du DOM. 
 * 
 *********************************************************************************/

import { filterGallery, validateEmail, validatePassword } from "./data.js";
import { postLogin } from "./api.js";


// déclaration des constantes
const login = {
    "texte": "login",
    "class": "js-login"
};
const logout = {
    "texte": "logout",
    "class": "js-logout"
};

/**
 * Cette fonction récupère en pramètre un tableau d'oeuvre
 * Elle vide le bloc div "gallery" pour afficher les éléments reçus en paramètre
 * @param {object} works : [{  
                            "id": number,
                            "title": string,
                            "imageUrl": string,
                            "categoryId": number,
                            "userId": number,
                            "category": object  {
                                                "id": number,
                                                "name": string
                                                }
                            }]
 */
export function generateGallery(works) {

    // Récupération de l'élément du DOM qui accueillera les oeuvres
    const divGallery = document.querySelector("#portfolio .gallery");
    // Initialisation de la div
    divGallery.innerHTML = "";

    // pour chaque élément de la liste, on va créer une fiche de l'oeuvre
    for (let i = 0; i < works.length; i++) {

        // on récupère l'élement pour créer la fiche de l'oeuvre
        let figure = works[i];

        // création des balises figure, image et figcaption
        let figureElement = document.createElement("figure");
        let imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;
        let figCaptionElement = document.createElement("figcaption");
        figCaptionElement.textContent = figure.title;

        // on rattache l'image et le figcaption à la figure
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figCaptionElement);

        // on rattache la figure à la div gallery
        divGallery.appendChild(figureElement);
    }
}

/**
 * Cette fonction récupère en pramètre la liste des catégories des oeuvres de la gallery 
 * et la liste de toutes les catégories
 * 
 * Elle crée un bloc après le h2 du portfolio et afficher les éléments 
 * reçus en paramètre en ajoutant un fitre "Tous"
 * 
 * @param {Set<Object>} categories : Liste des catégories présentes dans les oeuvres.
 * @param {Object[]} listCategories : Liste de toutes les catégories.
 */
export function generateFilterCategory(categories, listCategories) {

    // récupéraration de l'élément titre  qui précéde le bloc filtre
    const titreElement = document.querySelector("#portfolio h2");

    // création du block filtre
    const divFilter = document.createElement("div");
    divFilter.classList.add("filter");

    // création du premier bouton qui est actif par défaut
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.textContent = "Tous";
    // attribution d'un data-id pour identifier le filtre
    buttonElement.dataset.id = "all";
    // attribution des class pour la manipulation du CSS
    buttonElement.classList.add("filter-button-selected");
    buttonElement.classList.add("filter-button");

    // on rattache le premier filtre au bloc filtre
    divFilter.appendChild(buttonElement);

    // on balaye les catégories pour ajouter les autres boutons
    for (let category of listCategories) {

        // création du bouton
        buttonElement = document.createElement("button");
        buttonElement.type = "button";
        buttonElement.textContent = category.name;
        // attribution d'un data-id pour l'identifier
        buttonElement.dataset.id = category.id;
        // attribution des class pour la manipulation du CSS
        buttonElement.classList.add("filter-button");
        // Si aucune oeuvre de l'artiste ne rentre dans la catégorie :
        // Le bouton sera caché
        if (!categories.has(category.name)) {
            buttonElement.classList.add("display-none");
        }

        // on rattache le filtre au bloc filtre
        divFilter.appendChild(buttonElement);
    }

    // on insère le bloc filtre après le titre
    titreElement.insertAdjacentElement("afterend", divFilter);

}

/**
 * Cette fonction récupère les boutons du portfolio qui ont la classe 'filter-button'
 * Elle ajoute un EventListener afin d'écouter le click
 * Au clik, elle appelle la fonction modifiant l'affichage de la galerie, 
 * puis celle modifiant l'état des boutons filtres
 */
export function filterButtonEventListener() {

    // Récupération des boutons du bloc filtre
    let listeButtonElement = document.querySelectorAll("#portfolio .filter-button")

    /* Ajout des event listener */
    for (let i = 0; i < listeButtonElement.length; i++) {
        listeButtonElement[i].addEventListener("click", (event) => {
            const dataSetId = event.target.dataset.id;
            filterGallery(dataSetId);
            changeButtonSelected(listeButtonElement, dataSetId)
        })
    }
}

/**
 * Cette fonction met à jour l'état de sélection d'une liste de boutons.
 *
 * Parcourt tous les boutons du tableau :
 * - ajoute la classe `filter-button-selected` au bouton dont
 *   l'attribut `data-id` correspond à l'identifiant fourni ;
 * - retire cette classe de tous les autres boutons.
 *
 * Cette fonction garantit qu'un seul bouton est marqué comme sélectionné.
 *
 * @param {HTMLElement[]} listeButtonElement 
 * @param {string} dataSetId 
 */

function changeButtonSelected(listeButtonElement, dataSetId) {
    for (let i = 0; i < listeButtonElement.length; i++) {
        if (listeButtonElement[i].dataset.id === dataSetId) {
            listeButtonElement[i].classList.add("filter-button-selected");
        } else {
            listeButtonElement[i].classList.remove("filter-button-selected");

        }
    }
}

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
    emailEventListener(inputEmail);
    passwordEventListener(inputPassword);
    submitForm(form, inputEmail, inputPassword);
}

/**
 * Cette fonction contrôle le champ de saisie email et modifie le CSS suivant la validité de la saisie
 * @param {HTMLElement} inputPassword 
 */
function emailEventListener(inputEmail) {

    // On écoute quand le visiteur sort du champ de saisie et on vérifie que l'email est valide
    //  Si oui, on enlève la classe error
    //  Si non, on ajoute la classe error
    inputEmail.addEventListener("focusout", () =>
        validateEmail(inputEmail.value)
            ? inputEmail.classList.remove("error")
            : inputEmail.classList.add("error"));
}

/**
 * Cette fonction contrôle le champ de saisie password et modifie le CSS suivant la validité de la saisie
 * @param {HTMLElement} inputPassword 
 */
function passwordEventListener(inputPassword) {

    // On écoute quand le visiteur sort du champ de saisie et on vérifie que l'email est valide
    //  Si oui, on enlève la classe error
    //  Si non, on ajoute la classe error
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
function submitForm(form, inputEmail, inputPassword) {


    /* Gestion de la validation du formulaire */
    form.addEventListener("submit", async (event) => {
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
    })
}

/**
 * Cette fonction remplace le nom de la page actuelle par le nom de la page renseignée 
 * en paramètre. Puis elle effectue une redirection au niveau du navigateur.
 * Les deux fichiers html doivent être dans le même dossier.
 * @param {string} currentPage : Nom du fichier correspondant à la page actuelle.
 * @param {string} targetPage : Nom du fichier correspondant à la page cible.
 */
function redirectPage(currentPage, targetPage) {
    // Récupération de l'URL actuelle
    let currentAddress = document.URL;
    // Réécriture de l'adresse cible
    let targetAddress = currentAddress.replace(currentPage, targetPage);
    // Rediraction de la page vers l'adresse cible
    document.location.assign(targetAddress);
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


/**
 * Cette fonction génére le lien pointant sur le bloc modal
 */
function generateEditElement() {

    // récupéraration de l'élément titre  qui précéde le bloc d'édition
    const titreElement = document.querySelector("#portfolio h2");

    // on crée le lien vers l'ancre du bloc modal
    let lienElement = document.createElement("a");
    lienElement.classList.add("edit")
    lienElement.href = "#modalGestion"

    // on crée l'image du logo de l'édition
    let imageElement = document.createElement("img");
    imageElement.src = "./assets/icons/edit.png";
    imageElement.alt = "Logo d'édition";
    imageElement.classList.add("logo-edit")

    // on crée le paragraphe avec le texte
    let pElement = document.createElement("p");
    pElement.textContent = "modifier";

    // on assemble le bloc lien
    lienElement.appendChild(imageElement);
    lienElement.appendChild(pElement);

    // on ajoute le bloc après le titre
    titreElement.insertAdjacentElement("afterend", lienElement);
}

/**
 * Cette fonction supprime le lien pointant sur le bloc modal
 */

function removeEditElement() {

    // récupéraration du bloc d'édition
    const titreElement = document.querySelector("#portfolio .edit");

    if (titreElement) titreElement.remove();
}

/**
 * cette fonction modifie un élément du DOM en supprimant une class puis en ajoutant une autre.
 * Il modifie également le texte de l'élément si le paramètre est renseigné
 * @param {HTMLElement} HTMLElement : l'élément concerné par le changement de class et de texte
 * @param {string} oldClass : la classe a supprimer
 * @param {string} newClass : la class a ajouter
 * @param {string} newText : le nouveau contenu
 */

function changeClass(HTMLElement, oldClass, newClass, newText = null) {

    // supprime la class reçu en paramètre
    HTMLElement.classList.remove(oldClass);
    // ajoute la class reçu en paramètre
    HTMLElement.classList.add(newClass);
    // si il y a du texte en paramètre, il le modifie dans l'élément
    if (newText === null) HTMLElement.textContent = newText;
}

/**
 * Cette fonction gère la connexion et écoute le clik sur le lien login/logout et 
 * pointe vers login.html ou 
 * reste sur la page et supprime le token du localStorage
 * @param {string} currentPage : nom de la page actuelle
 */

export function logEventListener(currentPage) {

    // On récupère le token s'il est présent
    let token = window.localStorage.getItem("token");

    // on récupère le lien login/logout
    const lienLog = document.querySelector("header .js-log");

    // si nous avons un token, nous sommes connecté
    if (token !== null) {
        console.log("Connected");
        // si nous sommes sur l'index, nous appelons 
        // la fonction qui gé,ère le liens vers l'édition
        if (currentPage === "index.html") generateEditElement();
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
            // nous vidons les éléments token et id du localStorage
            localStorage.clear();
            console.log("Disconnected");
            // nous modifions le texte logout en login et les class associées
            changeClass(lienLog, logout.class, login.class, login.texte);
        }
    })


}