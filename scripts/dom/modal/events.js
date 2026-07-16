/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui gère les évênements de la modal.
 * 
 *********************************************************************************/

import {
    closeModal,
    changeModalPage
} from "./modal.js";
import { validatePostWork } from "./form.js";
import {
    modalPages,
    hiddenClass,
    errorClass,
    disabledClass
} from "../../config/constants.js";
import {
    imageAddPhotoAttribute,
    newImageClass
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
        const modal = event.target.parentElement.parentElement;
        changeModalPage(modal, modalPages.delete);
    });
}

/**
 * Cette fonction reçoit l'évênement du click sur le bouton de la modal
 * et dirige vers la page Add Work si nous étions sur delete Work
 * ou vérifie les éléments du formulaire si nous étions sur Add Work
 * @param {HTMLElement} buttonAddWork 
 */
export function buttonModalManagementEventListener(buttonAddWork) {

    buttonAddWork.addEventListener("click", (event) => {
        // annulation du comportement par défaut
        event.preventDefault();
        const modal = event.target.parentElement.parentElement;
        if (event.target.classList.contains("js-addWork")) {
            changeModalPage(modal, modalPages.add);
        } else {
            validatePostWork();
        }
    });
}

/**
 * Cette fonction reçoit un fichier en paramètre et l'affiche si c'est une image
 * Sinon elle affiche l'image par defaut
 * @param {file} photo
 */
export function addPhotoManagement(photo) {

    /* on récupère le bloc div Add Photo */
    const divAddPhotoElement = document.querySelector(".add-photo");

    // Vérifie s'il y a un un fichier du type image
    if (photo && photo.type.startsWith("image/")) {
        /* on parcours ses enfants pour afficher l'image choisie et 
        faire diparaitre les autres élements */
        for (const childElement of divAddPhotoElement.children) {
            if (childElement.classList.contains(imageAddPhotoAttribute.class)) {
                /* Remplace l'ancienne image par celle sélectionnée dans l'input */
                childElement.src = URL.createObjectURL(photo);
                /* on ajoute une class pour modifier le CSS */
                childElement.classList.add(newImageClass);
                /* on libère l'URL objet de la mémoire du navigateur */
                childElement.onload = () => URL.revokeObjectURL(childElement.src);
            } else {
                childElement.classList.add(hiddenClass);
            }
        }
    } else {
        /* on parcours ses enfants pour afficher l'image par défaut et 
        faire apparaitre les autres élements */
        for (const childElement of divAddPhotoElement.children) {
            if (childElement.classList.contains(imageAddPhotoAttribute.class)) {
                /* Replace l'image par défaut dans l'input */
                childElement.src = imageAddPhotoAttribute.src;
                /* on ajoute une class pour modifier le CSS */
                childElement.classList.remove(newImageClass);
                /* on libère l'URL objet de la mémoire du navigateur */
                childElement.onload = () => URL.revokeObjectURL(childElement.src);
            } else {
                childElement.classList.remove(hiddenClass);
            }
        }
    }
}

/**
 * Cette fonction désactive le bouton et ajoute la class pour le griser
 * @param {HTMLElement} button 
 */
export function buttonDisabled(button) {
    button.disabled = true;
    button.classList.add(disabledClass);
}

/**
 * Cette fonction active le bouton et enlève la class qui le grisait
 * @param {HTMLElement} button 
 */
export function buttonActivated(button) {
    button.disabled = false;
    button.classList.remove(disabledClass);
}

/**
 * Cette fonction reçoit un element en paramètre et 
 * récupère les éléments frères qui suivent. 
 * Il vérifie et supprime tous les éléments qui sont des messages d'erreur
 * @param {HTMLElement} element 
 */
export function removeErrorMessage(element) {

    /* on récupère les éléments frères qui suivent */
    let listeElement = [];
    let nextElement = element.nextElementSibling;
    while (nextElement !== null) {
        listeElement.push(nextElement);
        nextElement = nextElement.nextElementSibling;
    }

    listeElement.forEach((element) => {
        if (element.classList.contains(errorClass)) element.remove();
    })

}