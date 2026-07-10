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
} from "./builder.js";
import {
    divPhotoAttribute,
    divCategoriesAttribute,
    pInfoTitleErrorAttribute,
    inputFileAttribute,
    inputTitreAttribute,
    selectCategoriesAttribute
} from "../../config/attributs.js"
import {
    pInfoTitleError,
    inputFileError,
    categoriesError
} from "../../config/text.js";
import {
    validateTitle,
    validateImage,
    validateCategories
} from "../../services/data.js";
import { postWork } from "../../services/api.js";
import { addWorkGallery } from "../gallery.js";

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
    const divTitreAttribute = {}
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


    /* on rattache l'znsemble des block div au bloc post work*/
    listeChildElementPostWork.forEach(element => divModalPostWork.appendChild(element));

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
    erreurs.push(...validateImage(inputFileElement.files[0]));

    /* on récupère l'input du titre et
    on appelle la fonction qui va vérfier la conformité de la saisie */
    const inputTitleElement = document.getElementById(inputTitreAttribute.id);
    erreurs.push(...validateTitle(inputTitleElement.value));

    /* on récupère la liste déroulante et
    on appelle la fonction qui va vérfier la conformité de la saisie */
    const selectElement = document.getElementById(selectCategoriesAttribute.id);
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
        nous appellons la fonction qui va ajouter l'oeuvre à la gallery */
        if (reponse.etat) addWorkGallery(reponse.work);
        console.log(reponse);
    } else {
        erreurs.forEach(erreur => console.log(erreur));
    }
}
