/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions 
 * qui concerne la partie formulaire de la modal. 
 * 
 *********************************************************************************/

import { createElement } from "../ui.js";
import {
    createBlocAddPhoto,
    createBlocDivTitre,
    createBlocDivCategories
} from "../builder.js";
import {
    addPhotoManagement,
    buttonDisabled,
    buttonActivated,
    removeErrorMessage
} from "./events.js";
import {
    divPhotoAttribute,
    divCategoriesAttribute,
    pInfoTitleErrorAttribute,
    inputFileAttribute,
    inputTitreAttribute,
    selectCategoriesAttribute,
    imageAddPhotoAttribute
} from "../../config/attributs.js";
import {
    pInfoTitleError,
    addAPIWork
} from "../../config/text.js";
import {
    validateTitle,
    validateImage,
    validateCategories
} from "../../services/data.js";
import { postWork } from "../../services/api.js";
import { addWorkGallery } from "../gallery.js";
import { submitPost } from "../../config/constants.js";

/**
 * Cette fonction récupère le bloc principale de la modale et 
 * régénère son code HTML pour générer la page permettant d'ajouter une photo d'oeuvre.
 * @param {HTMLElement} divModalPostWork : block principal de la modale
 */
export async function generateEditPostWorks(divModalPostWork) {

    /* Initialisation de la div */
    divModalPostWork.innerHTML = "";

    /*  initialise les listes enfants des blocs parents */
    let listeChildElementPostWork = [];

    /* on appelle la fonction qui va créer l'élément div-photo */
    listeChildElementPostWork.push(createElement("div", divPhotoAttribute));
    /* on appelle la fonction qui va créer les élément du div-photo*/
    let listeChildElementDivPhoto = createBlocAddPhoto();
    /* on rattache les enfants au block div photo : 1er enfant de postWork*/
    listeChildElementDivPhoto.forEach(element => listeChildElementPostWork[0].appendChild(element));


    /* on crée un objet regroupant tous les attributs div-titre*/
    const divTitreAttribute = {};
    /* on appelle la fonction qui va créer l'élément div-titre*/
    listeChildElementPostWork.push(createElement("div", divTitreAttribute));
    /* on appelle la fonction qui va créer les élément du div-titre*/
    let listeChildElementDivTitre = createBlocDivTitre();
    /* on rattache les enfants au block div titre : 2ème enfant de postWork*/
    listeChildElementDivTitre.forEach(element => listeChildElementPostWork[1].appendChild(element));

    /* on appelle la fonction qui va créer l'élément div-categories*/
    listeChildElementPostWork.push(createElement("div", divCategoriesAttribute));
    /* on appelle la fonction qui va créer les élément du div-categories*/
    let listeChildElementDivCategories = await createBlocDivCategories();
    /* on rattache les enfants au block div catégorie : 3ème enfant de postWork*/
    listeChildElementDivCategories.forEach(element => listeChildElementPostWork[2].appendChild(element));

    /* on rattache l'ensemble des block div au bloc post work*/
    listeChildElementPostWork.forEach(element => divModalPostWork.appendChild(element));

    /* on appelle la fonction qui va ajouter les écouteurs sur les champs */
    editPostWorksManagement();
}

/**
 * Cette fonction contrôle les données saisies sur la page Ajout Photo et
 * appelle la fonction qui va envoyer la requête à l'API ou
 * affiche les erreurs afin que l'utilisateur puisse les corriger
 */
export async function validatePostWork() {


    /* on initialise le tableau des erreurs */
    let erreurs = [];

    /* on récupère l'input type file et 
    on appelle la fonction qui va vérfier la conformité de la saisie */
    const inputFileElement = document.getElementById(inputFileAttribute.id);
    removeErrorMessage(inputFileElement);
    erreurs.push(...validateImage(inputFileElement.files[0]));

    /* on récupère l'input du titre et
    on appelle la fonction qui va vérfier la conformité de la saisie */
    const inputTitleElement = document.getElementById(inputTitreAttribute.id);
    removeErrorMessage(inputTitleElement);
    erreurs.push(...validateTitle(inputTitleElement.value));

    /* on récupère la liste déroulante et
    on appelle la fonction qui va vérfier la conformité de la saisie */
    const selectElement = document.getElementById(selectCategoriesAttribute.id);
    removeErrorMessage(selectElement);
    erreurs.push(...await validateCategories(selectElement.value));

    if (erreurs.length === 0) {

        /* on initialise l'oeuvre */
        let work = {
            "image": inputFileElement.files[0],
            "title": inputTitleElement.value,
            "category": selectElement.value
        };

        /* on appelle la fonction qui va requêter l'API */
        const reponse = await postWork(work);
        /* Si nous avons une réussite pour la requête alors 
        nous appellons la fonction qui va ajouter l'oeuvre à la gallery 
        et réinitialisons les champs*/
        if (reponse.etat) {
            console.log(addAPIWork.successfull);
            addWorkGallery(reponse.work);
            resetPostWork(inputFileElement, inputTitleElement, selectElement);
        } else {
            console.log(addAPIWork.failed);
        };
    } else {
        erreurs.forEach((erreur) => {
            const pElement = createElement("p", pInfoTitleErrorAttribute, erreur.message);
            const fieldElement = document.querySelector(`[name="${erreur.field}"]`);
            fieldElement.insertAdjacentElement("afterend", pElement);
        });
    }
}

/**
 * Cette fonction vérifie les éléments saisies et modifie l'état du bouton Valider
 * elle l'active ou le désactive suivant si les champs sont complètement remplis ou non
 * @param {boolean} initialise :    true si nous sommes sur la création de la page 
 *                                  afin de ne pas aller chercher les éléments qui 
 *                                  ne sont pas encore créé
 */
export function validateButtonManagement() {

    /* on récupère les champs */
    const file = document.getElementById(inputFileAttribute.id);
    const title = document.getElementById(inputTitreAttribute.id);
    const category = document.getElementById(selectCategoriesAttribute.id);

    /* on vérifie si les champs sont remplis */
    const fileIsEmpty = file.files.length === 0;
    const titleIsEmpty = title.value.trim() === "";
    const categoryIsEmpty = category.value === "";

    /* on récupère le button */
    const button = document.querySelector(`#modalGestion .${submitPost.class}`);
    /* Tant que l'un des trois est vide, le boutton reste désactivé */
    if (fileIsEmpty || titleIsEmpty || categoryIsEmpty) {
        buttonDisabled(button);
    } else {
        buttonActivated(button);
    }

}

/**
 * Cette fonction écoute les champs du formulaire et 
 * appelle les fonctions de gestions de ces champs 
 */
function editPostWorksManagement() {

    /* on récupère l'élément image */
    const imageElement = document.getElementById(imageAddPhotoAttribute.id);
    imageElement.addEventListener("click", () => {
        document.getElementById(inputFileAttribute.id).click();
    });

    /* on récupère l'élément input type file */
    const inputElement = document.getElementById(inputFileAttribute.id);
    inputElement.addEventListener("change", () => {
        addPhotoManagement(inputElement.files[0]);
        validateButtonManagement();
        removeErrorMessage(inputElement);
    });

    /* on récupère l'élément input titre */
    const inputTitreElement = document.getElementById(inputTitreAttribute.id);
    inputTitreElement.addEventListener("focus", () => {
        validateButtonManagement();
        removeErrorMessage(inputTitreElement);
    });

    /* on récupère l'élément select categories */
    const selectCategoriesElement = document.getElementById(selectCategoriesAttribute.id);
    selectCategoriesElement.addEventListener("change", () => {
        validateButtonManagement();
        removeErrorMessage(selectCategoriesElement);
    });
}

/**
 * Cette fonction réinitialise les champs passés en paramètre
 * @param {HTMLElement} inputFile 
 * @param {HTMLElement} inputText 
 * @param {HTMLElement} select 
 */
function resetPostWork(inputFile, inputText, select) {

    /* on réinitialise les champs */
    inputFile.value = "";
    inputText.value = "";
    select.selectedIndex = 0;

    /* on rappelle la fonction qui gère le bouton 
    puis celle qui gère l'affichage de l'image */
    validateButtonManagement();
    addPhotoManagement(inputFile.files[0]);

}


