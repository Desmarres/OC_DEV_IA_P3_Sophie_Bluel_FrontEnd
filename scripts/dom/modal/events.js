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
