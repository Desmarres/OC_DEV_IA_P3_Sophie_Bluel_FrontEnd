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

    /* on crée un objet regroupant tous les attributs div-photo*/
    const divPhotoAttribute = {
        "class": "add-photo"
    };
    /* on appelle la fonction qui va créer l'élément div-photo */
    listeChildElementPostWork.push(createElement("div", divPhotoAttribute));
    /* on appelle la fonction qui va créer les élément du div-photo*/
    let listeChildElementDivPhoto = createBlocAddPhoto();
    /* on rattache les enfants au block div photo : 1er enfant de postWork*/
    listeChildElementDivPhoto.forEach(element => listeChildElementPostWork[0].appendChild(element));


    /* on crée un objet regroupant tous les attributs div-titre*/
    const divTitreAttribute = {}
    /* on appelle la fonction qui va créer l'élément div-titre*/
    listeChildElementPostWork.push(createElement("div", divTitreAttribute,));
    /* on appelle la fonction qui va créer les élément du div-titre*/
    let listeChildElementDivTitre = createBlocDivTitre();
    /* on rattache les enfants au block div titre : 2ème enfant de postWork*/
    listeChildElementDivTitre.forEach(element => listeChildElementPostWork[1].appendChild(element));


    /* on crée un objet regroupant tous les attributs div-categories*/
    const divCategoriesAttribute = {
        "class": "categories"
    }
    /* on appelle la fonction qui va créer l'élément div-categories*/
    listeChildElementPostWork.push(createElement("div", divCategoriesAttribute));
    /* on appelle la fonction qui va créer les élément du div-categories*/
    let listeChildElementDivCategories = await createBlocDivCategories();
    /* on rattache les enfants au block div catégorie : 3ème enfant de postWork*/
    listeChildElementDivCategories.forEach(element => listeChildElementPostWork[2].appendChild(element));


    /* on rattache l'znsemble des block div au bloc post work*/
    listeChildElementPostWork.forEach(element => divModalPostWork.appendChild(element));

}


export function validatePostWork() {
    console.log("Ajout d'une oeuvre");
}
