/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions 
 * qui concerne la partie galerie de la modal. 
 * 
 *********************************************************************************/

import { getWorks, deleteWork } from "../../services/api.js";

import { removeElementBydataId } from "../ui.js";

import { createWorkEditMode } from "./builder.js";

/**
 * Cette fonction génère la gallerie de la modal ouverte pour l'édition du site
 */
export async function generateEditGallery(divModalGallery) {

    // on récupére toutes les oeuvres de l'artiste
    const works = await getWorks();

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
 * Cette fonction reçoit l'id d'une oeuvre à supprimer.
 * Elle appelle la fonction qui va requêter l'API
 * En cas de succès, elle appelle la fonction qui va supprimer 
 * l'ensemble des oeuvres correspondant à cette id du site
 * @param {number} id : id de l'oeuvre à supprimer
 */
export async function deleteWorkManagement(id) {

    // on appelle la fonction qui va requeter l'API pour supprimer 
    // l'élement correspondant à l'id reçu en entrée
    const reponse = await deleteWork(id);
    // si la requête est un succès
    if (reponse.etat) {
        removeElementBydataId("figure", id);
    } else {
        console.log(reponse.statusText);
    }
}