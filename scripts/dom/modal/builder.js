/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions 
 * qui construise le DOM de la modal. 
 * 
 *********************************************************************************/

import { createElement } from "../ui.js";
import { getCategories } from "../../services/api.js";
import { deleteButton } from "../../config/attributs.js";
import {
    imageAddPhotoAttribute,
    inputFileAttribute,
    labelFileAttribute,
    pInfoPhotoAttribute,
    labelTitreAttribute,
    inputTitreAttribute,
    labelCategoriesAttribute,
    selectCategoriesAttribute
} from "../../config/attributs.js";
import {
    labelFileText,
    pInfoPhotoText,
    labelTitreText,
    labelCategoriesText
} from "../../config/text.js";
import { addPhotoManagement } from "./events.js";
import { deleteWorkManagement } from "./modalGallery.js";


/**
 * Cette fonction reçoit une ouevre en entrée et 
 * retourne l'élément figure correspondant à l'oeuvre
 * @param {object} work :{  
                            "id": number,
                            "title": string,
                            "imageUrl": string,
                            "categoryId": number,
                            "userId": number,
                            "category": object  {
                                                "id": number,
                                                "name": string
                                                }
                            }
 * @returns {HTMLElement} : l'élément DOM figure correspondant à l'oeuvre reçu en entrée
 */
export function createWorkEditMode(work) {


    /* création de la balise figure */
    let figureElement = document.createElement("figure");
    /* attribution d'un data-id pour identifier l'oeuvre */
    figureElement.dataset.id = work.id;

    // initilisation de la variable enfant
    let listeFigureElement = [];
    let listeButtonElement = [];

    /* on crée un objet regroupant tous les attributs de la balise image*/
    const imageAttribute = {
        "src": work.imageUrl,
        "alt": work.title
    }
    /* on appelle la fonction qui va créer l'élément image et 
    on l'ajoute aux enfants de l'élement figure*/
    listeFigureElement.push(createElement("img", imageAttribute));


    /* on appelle la fonction qui va créer le bouton délete avec l'icone*/
    let buttonElement = createIconeBouton(deleteButton.classBouton, deleteButton.classIcone, deleteButton.ariaLabel)
    /* on l'ajoute aux enfants de l'élement figure */
    listeFigureElement.push(buttonElement);

    // on écoute le click pour appeller la fonction de gestion de la suppression d'une oeuvre
    buttonElement.addEventListener("click", (event) => {
        const workId = event.target.closest("figure").getAttribute("data-id");
        deleteWorkManagement(workId);
    });

    /* on rattache les enfants a l'élément fontawesome supprimer : 2ème enfant de figureElement*/
    listeButtonElement.forEach(element => listeFigureElement[1].appendChild(element));

    /* on rattache les enfants au block figureElement */
    listeFigureElement.forEach(element => figureElement.appendChild(element));

    return figureElement;
}

/**
 * Cette fonction reçoit des nom de class et de label et 
 * retourne un élément HTML de type bouton avec un icone fontAwesome
 * @param {string} classBouton 
 * @param {string} classIcone 
 * @param {string} ariaLabel 
 * @returns {HTMLElement} : le bputon avec l'isone à l'intérieur
 */
export function createIconeBouton(classBouton, classIcone, ariaLabel) {

    /* on crée un objet regroupant tous les attributs du boutton*/
    const buttonAttribute = {
        "type": "button",
        "aria-label": ariaLabel,
        "class": classBouton
    }
    /* on appelle la fonction qui va créer l'élément boutton*/
    let buttonElement = createElement("button", buttonAttribute);

    /* on crée un objet regroupant tous les attributs de l'élément fontawesome supprimer*/
    const iconeAttribute = {
        "class": classIcone,
        "aria-hidden": ""
    }
    /* on appelle la fonction qui va créer l'élément fontawesome supprimer*/
    buttonElement.appendChild(createElement("i", iconeAttribute));

    return buttonElement;

}

/**
 * Cette fonction créer tout les éléments enfants du block div AddPhoto
 * @returns {HTMLElement[]} : tableau des éléments crées
 */
export function createBlocAddPhoto() {

    // initilisation de la variable
    let listeChildElementDivPhoto = [];

    /* on appelle la fonction qui va créer l'élément add-photo*/
    const imageElement = createElement("img", imageAddPhotoAttribute);
    /* on ajoute un écouteur click sur l'image pour déclancher l'input */
    imageElement.addEventListener("click", () => {
        document.getElementById(inputFileAttribute.id).click()
    });
    /* on l'ajoute à la liste des enfants du bloc Div Photo */
    listeChildElementDivPhoto.push(imageElement);


    /* on appelle la fonction qui va créer l'élément add-photo*/
    listeChildElementDivPhoto.push(createElement("label", labelFileAttribute, labelFileText));

    /* on appelle la fonction qui va créer l'élément input type file*/
    const inputElement = createElement("input", inputFileAttribute);
    /* on ajoute un écouteur change */
    inputElement.addEventListener("change", () => addPhotoManagement(inputElement.files[0]));

    /* on l'ajoute à la liste des enfants du bloc Div Photo */
    listeChildElementDivPhoto.push(inputElement);

    /* on crée un objet regroupant tous les attributs paragraphe d'information*/

    /* on appelle la fonction qui va créer l'élément paragraphe d'information*/
    listeChildElementDivPhoto.push(createElement("p", pInfoPhotoAttribute, pInfoPhotoText));

    return listeChildElementDivPhoto
}

/**
 * Cette fonction créer tout les éléments enfants du block div titre
 * @returns {HTMLElement[]} : tableau des éléments crées
 */
export function createBlocDivTitre() {

    // initilisation de la variable
    let listeChildElementDivTitre = [];

    /* on appelle la fonction qui va créer l'élément label-titre*/
    listeChildElementDivTitre.push(createElement("label", labelTitreAttribute, labelTitreText));

    /* on appelle la fonction qui va créer l'élément input type file*/
    listeChildElementDivTitre.push(createElement("input", inputTitreAttribute));

    return listeChildElementDivTitre
}

/**
 * Cette fonction créer tout les éléments enfants du block div catégorie
 * @returns {HTMLElement[]} : tableau des éléments crées
 */
export async function createBlocDivCategories() {

    // initilisation de la variable
    let listeChildElementDivCategories = [];

    /* on appelle la fonction qui va créer l'élément label-categories*/
    listeChildElementDivCategories.push(createElement("label", labelCategoriesAttribute, labelCategoriesText));

    /* on appelle la fonction qui va créer l'élément input type file*/
    listeChildElementDivCategories.push(createElement("select", selectCategoriesAttribute));

    /* on appelle la fonction qui va créer les options */
    let listeChildElementSelect = await createBlocSelect();

    /* on rattache les enfants au block select : 2éme enfant de div catégorie*/
    listeChildElementSelect.forEach(element => listeChildElementDivCategories[1].appendChild(element));

    return listeChildElementDivCategories
}

/**
 * Cette fonction créer tout les éléments option du block select
 * @returns {HTMLElement[]} : tableau des éléments crées
 */
export async function createBlocSelect() {

    // initilisation de la variable
    let listeChildElementSelect = [];

    /* on crée un objet regroupant tous les attributs de la première option 
    par défaut et non sélectionnable*/
    let optionCategorieAttribute = {
        "value": "",
        "selected": "",
        "disabled": ""
    }
    /* on appelle la fonction qui va créer l'élément option*/
    listeChildElementSelect.push(createElement("option", optionCategorieAttribute));


    /* onmodal-delete-work récupère les catégories du serveur */
    const listeCategories = await getCategories();

    /* pour chaque élément de la liste, on va créer une option et 
    on va l'ajouter à la balise select*/
    listeCategories.forEach(categorie => {
        /* on crée un objet regroupant tous les attributs input type file*/
        let selectCategoriesAttribute = {
            "value": categorie.id
        }
        let selectCategoriesText = categorie.name;
        /* on appelle la fonction qui va créer l'élément input type file*/
        listeChildElementSelect.push(createElement("option", selectCategoriesAttribute, selectCategoriesText));
    })


    return listeChildElementSelect
}
