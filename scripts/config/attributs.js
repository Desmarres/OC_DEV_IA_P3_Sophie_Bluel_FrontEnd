/*********************************************************************************
 * 
 * Ce fichier contient les attributs des éléments HTML. 
 * 
 *********************************************************************************/

import { errorClass } from "./constants.js";

/* -------------- Attributs des icones -------------- */

/* Attributs des icones Buttons */
export const deleteButton = {
    classBouton: "logo-delete-work",
    classIcone: "fa-solid fa-trash-can",
    ariaLabel: "Delete work"
};

export const previousButton = {
    classBouton: "logo logo-previous-page",
    classIcone: "fa-solid fa-arrow-left",
    ariaLabel: "Previous page"
};

export const closeButton = {
    classBouton: "logo logo-close-cross",
    classIcone: "fa-solid fa-xmark",
    ariaLabel: "Close page"
};


/* -------------- Attributs des éléments du formulaire de la modal -------------- */

/* Partie ajout image */
export const divPhotoAttribute = {
    "class": "add-photo"
};

export const imageAddPhotoAttribute = {
    "src": "./assets/icons/picture-svgrepo-com.svg",
    "alt": "icone d'image",
    "class": "js-imgAddPhoto"
};

export const newImageClass = "img-add-photo";

export const inputFileAttribute = {
    "type": "file",
    "name": "image",
    "id": "photoInputFormModal",
    "accept": "image/png, image/jpeg",
    "hidden": ""
};

export const labelFileAttribute = {
    "for": "photoInputFormModal",
    "class": "button-add-image"
};

export const pInfoPhotoAttribute = {
    "class": "info"
};

/* Partie Titre */

export const labelTitreAttribute = {
    "for": "titleFormModal"
};

export const inputTitreAttribute = {
    "type": "text",
    "name": "title",
    "id": "titleFormModal",
    "class": "form-element"
};

/* Partie Catégories */

export const divCategoriesAttribute = {
    "class": "categories"
};

export const labelCategoriesAttribute = {
    "for": "categoriesFormModal"
};

export const selectCategoriesAttribute = {
    "name": "category",
    "id": "categoriesFormModal",
    "required": "",
    "class": "form-element"
};

/* Partie Erreurs */

export const pInfoTitleErrorAttribute = {
    "class": `info ${errorClass}`
};
