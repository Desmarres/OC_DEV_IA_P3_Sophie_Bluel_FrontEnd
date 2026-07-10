/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne la partie modal. 
 * 
 *********************************************************************************/

import {
    createBlockModifier,
    changeClass,
    createElement
} from "../ui.js";

import {
    addWork,
    submitPost,
    deleteWorks,
    postWorks,
    modalTitle,
    modalPages
} from "../../config/constants.js";

import {
    previousButton,
    closeButton
} from "../../config/attributs.js";

import { generateEditGallery } from "./modalGallery.js";

import { generateEditPostWorks } from "./form.js";

import { createIconeBouton } from "./builder.js";

import {
    buttonModalManagement,
    closeModalEventListener,
    previousModalPageEventListener
} from "./events.js";

/**
 * Cette fonction génére le lien pointant sur le bloc modal
 */
export function generateEditElement() {

    // récupéraration de l'élément titre  qui précéde le bloc d'édition
    const titreElement = document.querySelector("#portfolio h2");

    // on crée le lien vers l'ancre du bloc modal
    let lienElement = document.createElement("a");
    lienElement.classList.add("edit")
    lienElement.href = "#modalGestion"

    //on appelle la fonction qui va créer les éléments HTML interne à la balise crée
    createBlockModifier(lienElement, "modifier")

    // on ajoute le bloc après le titre
    titreElement.insertAdjacentElement("afterend", lienElement);

    // on appelle la fonction qui gère l'ouverture de la modal
    lienElement.addEventListener("click", (event) => modalOpeningManagement(event, lienElement));

    /* on ajoute un écouteur sur le bouton de la modale puis on appelle la fonction de gestion du bouton*/
    const buttonAddWork = document.querySelector(".modal-wrapper .button");
    buttonAddWork.addEventListener("click", (event) => buttonModalManagement(event));
}

/**
 * Cette fonction reçoit un élément lien en paramètre et ouvre la modale correspondante. 
 * Elle initialise les écouteurs pour la fermeture de la modale.
 * @param {event} event : reçoit l'evenement du clik sur le lien d'ouverture de la podal
 * @param {HTMLElement} lienElement : le lien ouvrant la modale dont l'ID est dans l'attribut href
 */
function modalOpeningManagement(event, lienElement) {
    /* annulation du comportement par défaut */
    event.preventDefault();

    /* on récupère l'ID de la modale */
    const idModal = lienElement.getAttribute("href");
    /* on récupère l'élément HTML correspondant à la modale */
    const targetModal = document.querySelector(idModal);
    /* on appelle la fonction d'affichage de la modale */
    openModal(targetModal);

    /* on crée une table qui va stocker les éléments 
    qui au click fermeront la modale */
    let listElementCloseModal = [targetModal]

    /* On vérifie si le bouton ClosCross n'est pas déjà créer */
    if (targetModal.querySelector(`[aria-label="${closeButton.ariaLabel}"]`) === null) {
        /* on crée le bouton ClosCross permettant de fermer la modale et
        on l'insère avant le titre de la modale */
        let targetClosCross = createIconeBouton(closeButton.classBouton, closeButton.classIcone, closeButton.ariaLabel);
        targetModal.querySelector("h2").before(targetClosCross);
        /* on ajoute l'élément à la table CloseModal */
        listElementCloseModal.push(targetClosCross);
    }

    /* pour chaque élément du tableau, on appelle la fonction qui 
    applique un écouteur permettant de fermer la modale */
    listElementCloseModal.forEach(element => closeModalEventListener(element, targetModal))

    /* on stop la propagation de l'écouteur qui ferme la modale pour la partie fenêtre de gestion */
    const modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.addEventListener("click", (event) => event.stopPropagation());

    /* Récupération de l'élément du DOM qui accueillera les oeuvres */
    const modalDivMain = document.querySelector("#modalGestion .modal-main");
    /* on appelle la fonction qui génère la gallerie */
    generateEditGallery(modalDivMain);
}

/**
 * Cette fonction récupère l'élément HTML du corp de la modale et le nom de la page cible.
 * Elle effectue les modification de class et texte des différents élément fixe. 
 * Elle appelle les fonctions qui régénère le code de la partie principale de la modale.
 * @param {HTMLElement} modalElement : bloc correspondant à la modale
 * @param {string} nameModalPage : nom de la page de la modale 
 */
export function changeModalPage(modalElement, nameModalPage) {

    /* on récupère le titre de la modal */
    const modalH2 = modalElement.querySelector("h2");

    /* on récupère le block principal de la modale*/
    const modalDivMain = modalElement.querySelector(".modal-main");

    /* on récupère le button de la modale */
    const modalButton = modalElement.querySelector(".button");

    if (nameModalPage === modalPages.add) {
        /* on modifie le titre */
        modalH2.textContent = modalTitle.postWorks;
        /* on change les classes et le texte du bouton */
        changeClass(modalButton, addWork.class, submitPost.class, submitPost.texte);
        /* on change les classes du block principal de la modale */
        changeClass(modalDivMain, deleteWorks.class, postWorks.class);


        let buttonArrow = createIconeBouton(previousButton.classBouton, previousButton.classIcone, previousButton.ariaLabel);
        modalH2.before(buttonArrow);

        previousModalPageEventListener(buttonArrow);

        generateEditPostWorks(modalDivMain);




    } else {
        /* on modifie le titre */
        modalH2.textContent = modalTitle.deleteWorks;
        /* on change les classes et le texte du bouton */
        changeClass(modalButton, submitPost.class, addWork.class, addWork.texte);
        /* on change les classes du block principal de la modale */
        changeClass(modalDivMain, postWorks.class, deleteWorks.class);

        /* on récupère la flèche previouspage */
        const buttonArrow = modalElement.querySelector(".logo-previous-page");
        if (buttonArrow !== null) buttonArrow.remove();

        generateEditGallery(modalDivMain)
    }
}

/**
 * Cette fonction rend visible la modale
 * @param {HTMLElement} modal 
 */
function openModal(modal) {
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute("aria-modal", "true");
}

/**
 * Cette fonction cache la modal
 * @param {HTMLElement} modal 
 */
export function closeModal(modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', "true");
    modal.removeAttribute("aria-modal");
}

/**
 * Cette fonction supprime le lien pointant sur le bloc modal
 */

export function removeEditElement() {

    // récupéraration du bloc d'édition
    const titreElement = document.querySelector("#portfolio .edit");

    if (titreElement) titreElement.remove();
}
