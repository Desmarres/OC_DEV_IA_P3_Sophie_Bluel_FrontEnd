/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions 
 * gère les évênements. 
 * 
 *********************************************************************************/

import {
    closeModal,
    changeModalPage
} from "./modal.js";

import { validatePostWork } from "./form.js";

import { modalPages } from "../../config/constants.js";

import {
    imageAddPhotoAttribute,
    inputFileAttribute
} from "../../config/attributs.js";

/**
 * Cette fonction appelle la fonction fermant la modal au clisk sur l'éléments en paramètre 
 * et
 * @param {HTMLElement} modal : modal ciblé par la fermeture
 */
export function closeModalEventListener(element, modal) {
    element.addEventListener("click", () => {
        // annulation du comportement par défaut
        event.preventDefault();
        closeModal(modal);
        changeModalPage(modal, modalPages.delete);
    });

}

/**
 * Cette fonction initialise des écouteurs de clisk sur les éléments du tableau en paramètre 
 * et appelle la fonction fermant la modal
 * @param {HTMLElement[]} listeElementHTML : tableau de plusieurs éléments à balayer
 * @param {HTMLElement} modal : modal ciblé par la fermeture
 */
export function previousModalPageEventListener(element) {
    element.addEventListener("click", (event) => {
        // annulation du comportement par défaut
        event.preventDefault();
        const modal = event.target.parentElement.parentElement
        changeModalPage(modal, modalPages.delete);
    });
}

/**
 * Cette fonction reçoit l'évênement du click sur le bouton de la modal
 * et dirige vers la page Add Work si nous étions sur delete Work
 * ou vérifie les éléments du formulaire si nous étions sur Add Work
 * @param {Event} event 
 */
export function buttonModalManagement(event) {
    // annulation du comportement par défaut
    event.preventDefault();
    const modal = event.target.parentElement.parentElement
    if (event.target.classList.contains("js-addWork")) {
        changeModalPage(modal, modalPages.add);
    } else {
        validatePostWork();
    }
}

export function addPhotoManagement(photo) {

    // Vérifie s'il y a un un fichier du type image
    if (photo && photo.type.startsWith("image/")) {

        /* on récupère le bloc div Add Photo */
        const divAddPhotoElement = document.querySelector(".add-photo");
        /* on parcours ses enfants pour afficher l'image choisie et 
        faire diparaitre les autres élements */
        for (const childElement of divAddPhotoElement.children) {
            if (childElement.classList.contains(imageAddPhotoAttribute.class)) {
                /* Remplace l'ancienne image par celle sélectionnée dans l'input */
                childElement.src = URL.createObjectURL(photo);
                /* on ajoute une class pour modifier le CSS */
                childElement.classList.add("img-add-photo");
                /* on libère l'URL objet de la mémoire du navigateur */
                childElement.onload = () => URL.revokeObjectURL(childElement.src);
            } else {
                childElement.style.display = "none";
            }
        }
    }

    console.log("file : ", photo);
    console.log("type : ", photo.type);
}
