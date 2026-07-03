/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne la partie modal. 
 * 
 *********************************************************************************/

import { getWorks } from "../services/api.js";
import { createBlockModifier } from "./ui.js";

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
}

/**
 * Cette fonction reçoit un élément lien en paramètre et ouvre la modale correspondante. 
 * Elle initialise les écouteurs pour la fermeture de la modale.
 * @param {HTMLElement} lienElement : le lien ouvrant la modale dont l'ID est dans l'attribut href
 */
function modalOpeningManagement(event, lienElement) {

    console.log(event);
    console.log(lienElement);

    // annulation du comprtement par défaut
    event.preventDefault();
    // on récupère l'ID de la modale
    const idModal = lienElement.getAttribute("href");
    // on récupère l'élément HTML correspondant à la modale
    const targetModal = document.querySelector(idModal);
    // on appelle la fonction d'afficahge de la modale
    openModal(targetModal);
    // on récupère le logo permettant de fermer la modale
    const targetClosCross = document.querySelector(idModal + " .logo-close-cross");
    // on crée un tableau des éléments à écouter pour fermer la modale
    const listeElementCloseModal = [targetModal, targetClosCross];
    // on appelle la fonction qui va placer des écouteurs sur les éléments du tableau
    closeModalEventListener(listeElementCloseModal, targetModal);
    // on stop la propagation de l'écouteur qui ferme la modale pour la partie fenêtre de gestion
    const modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.addEventListener("click", (event) => event.stopPropagation());
}

/**
 * Cette fonction initialise des écouteurs de clisk sur les éléments du tableau en paramètre 
 * et appelle la fonction fermant la modal
 * @param {HTMLElement[]} listeElementHTML : tableau de plusieurs éléments à balayer
 * @param {HTMLElement} targetModal : modal ciblé par la fermeture
 */
function closeModalEventListener(listeElementHTML, modal) {
    listeElementHTML.forEach(element => {
        element.addEventListener("click", () => closeModal(modal));
    });
}

/**
 * Cette fonction rend visible la modale
 * @param {HTMLElement} modal 
 */
function openModal(modal) {
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute("aria-modal", "true");
    generateEditGallery();
}

/**
 * Cette fonction génère la gallerie de la modal ouverte pour l'édition du site
 */
async function generateEditGallery() {

    // on récupére toutes les oeuvres de l'artiste
    const works = await getWorks();

    // Récupération de l'élément du DOM qui accueillera les oeuvres
    const divModalGallery = document.querySelector("#modalGestion .modal-gallery");
    // Initialisation de la div
    divModalGallery.innerHTML = "";

    // pour chaque élément de la liste, on va créer une fiche de l'oeuvre
    works.forEach(work => {

        // on appelle la fonction qui va créer l'élément figure avec l'oeuvre
        const figureElement = createWorkEditMode(work);

        // on rattache la figure à la div gallery
        divModalGallery.appendChild(figureElement);
    })
}

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
function createWorkEditMode(work) {

    // création de la balise figure
    let figureElement = document.createElement("figure");
    // attribution d'un data-id pour identifier l'oeuvre
    figureElement.dataset.id = work.id;

    // création de la balise image
    let imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    // création de l'élément fontawesome supprimer
    let iconeElement = document.createElement("i");
    iconeElement.classList.add("fa-solid");
    iconeElement.classList.add("fa-trash-can");
    iconeElement.setAttribute("aria-hidden", "true");

    // création de la balise bouton supprimer
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("aria-label", "Delete");
    deleteButton.classList.add("logo-delete-work");

    // on rattache l'icone supprimer à l'image
    deleteButton.appendChild(iconeElement);

    // on rattache l'image et le figcaption à la figure
    figureElement.appendChild(imageElement);
    figureElement.appendChild(deleteButton);

    return figureElement;
}

/**
 * Cette fonction cache la modal
 * @param {HTMLElement} modal 
 */
function closeModal(modal) {
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
