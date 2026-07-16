/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne la partie gallery. 
 * 
 *********************************************************************************/

import { filterGallery } from "../services/data.js";
import {
    createElement,
    removeElementBydataId
} from "./ui.js";
import {
    getWorks,
    deleteWork
} from "../services/api.js";
import {
    divFilterAttribute,
    buttonFilterDefaultAttribute,
    deleteButton
} from "../config/attributs.js";
import { hiddenClass, filterSelectedClass } from "../config/constants.js";
import {
    buttonFilterTousText,
    deleteAPIWork
} from "../config/text.js";
import {
    createIconeBouton,
    createWorkGallery
} from "./builder.js";

/**
 * Cette fonction initialise la gallerie principale du site
 * Elle reçoit une liste d'oeuvres et génère l'affichage
 * @param {object[]} works : [{
                        "id": number,
                        "title": string,
                        "imageUrl": string,
                        "categoryId": number,
                        "userId": number,
                        "category": object  {
                                            "id": number,
                                            "name": string
                                            }
                        }]
 */
export function initMainGallery(works) {
    /* Récupération de l'élément du DOM qui accueillera les oeuvres */
    const divGallery = document.querySelector("#portfolio .gallery");

    /* on réinitialise la galerie */
    const listeFigures = generateGallery(works, divGallery);

    /* pour chaque élément de la liste, on va créer la légende */
    listeFigures.forEach(figure => addFigcaption(figure));
}

/**
 * Cette fonction initialise la gallerie de la modal
 * Elle reçoit l'élément modal et génère l'affichage des oeuvres
 * @param {HTMLElement} divModalGallery 
 */
export async function initDeleteGallery(divModalGallery) {

    /* on récupére toutes les oeuvres de l'artiste */
    const works = await getWorks();

    /* on réinitialise la galerie */
    const listeFigures = generateGallery(works, divModalGallery);

    /* pour chaque élément de la liste, on va créer le bouton de suppression */
    listeFigures.forEach(figure => {
        const button = addDeleteButton(figure);
        /* on écoute le click pour appeller la fonction de gestion de la suppression d'une oeuvre */
        button.addEventListener("click", (event) => {
            const workId = event.target.closest("figure").getAttribute("data-id");
            deleteWorkManagement(workId);
        });
    });
}

/**
 * Cette fonction génère une galerie en créant des élément de type figure 
 * avec les oeuvres reçus en paramètre.
 * Elle ajoute les éléments créés comme enfant de l'élément block donné en paramètre
 * @param {object[]} works  : [{
                        "id": number,
                        "title": string,
                        "imageUrl": string,
                        "categoryId": number,
                        "userId": number,
                        "category": object  {
                                            "id": number,
                                            "name": string
                                            }
                        }]
 * @param {HTMLElement} blockElement 
 * @returns 
 */
export function generateGallery(works, blockElement) {

    /* Initialisation de le block */
    blockElement.innerHTML = "";

    /* Initialisation du tableau des éléments figures */
    let listeFigures = [];

    /* pour chaque élément de la liste, on va créer une fiche de l'oeuvre */
    works.forEach(work => listeFigures.push(createWorkGallery(work)));

    listeFigures.forEach(figure => blockElement.appendChild(figure));

    return listeFigures;
}

/**
 * Cette fonction ajoute un élément Bouton à l'élément figure fournis en paramètre
 * Elle rétourne l'élement créé.
 * @param {HTMLElement} figure 
 * @returns {HTMLElement} type button
 */
function addDeleteButton(figure) {

    /* on appelle la fonction qui va créer le bouton délete avec l'icone*/
    const button = createIconeBouton(deleteButton.classBouton, deleteButton.classIcone, deleteButton.ariaLabel);

    /* on rattache le bouton à l'élément figure */
    figure.appendChild(button);

    return button;
}

/**
 * Cette fonction ajoute un élément FigCaption à l'élément figure fournis en paramètre
 * Elle récupère l'attribut ALT de l'image pour en faire la légende
 * @param {HTMLElement} figure 
 */
export function addFigcaption(figure) {

    /* on initialise les attribut du figcaption */
    const figCaptionAttribut = {};

    /* création récupère l'argument alt de la photo pour l'écrire dans la légende */
    const figCaptionText = figure.querySelector("img").alt;

    /* on crée et on rattache le figcaption à la figure */
    figure.appendChild(createElement("figcaption", figCaptionAttribut, figCaptionText));

}

/**
 * Cette fonction récupère en pramètre la liste des catégories des oeuvres de la gallery 
 * et la liste de toutes les catégories
 * 
 * Elle crée un bloc après le h2 du portfolio et afficher les éléments 
 * reçus en paramètre en ajoutant un fitre "Tous"
 * 
 * @param {Set<Object>} categories : Liste des catégories présentes dans les oeuvres.
 * @param {Object[]} listCategories : Liste de toutes les catégories.
 */
export function generateFilterCategory(categories, listCategories) {

    /* récupéraration de l'élément titre  qui précéde le bloc filtre */
    const titreElement = document.querySelector("#portfolio h2");

    /* création du block filtre */
    const divFilter = createElement("div", divFilterAttribute);

    /* initilisation de la variable enfant de la div */
    let listedivFilter = [];

    /* Récupération des attributs par défaut du bouton */
    let buttonFilterTousAttribute = { ...buttonFilterDefaultAttribute };
    /* on rajoute la class Selected au class par défaut des boutons */
    buttonFilterTousAttribute.class += " " + filterSelectedClass;
    /* on l'ajoute aux enfants de l'élement div filtre */
    listedivFilter.push(createElement("button", buttonFilterTousAttribute, buttonFilterTousText));

    /* on balaye les catégories pour ajouter les autres boutons */
    for (let category of listCategories) {

        /* initilaisation du text du bouton */
        let buttonFilterText = category.name;
        /* Récupération des attributs par défaut du bouton */
        let buttonFilterAttribute = { ...buttonFilterDefaultAttribute }
        /* modification du data-id suivant la catégorie */
        buttonFilterAttribute['data-id'] = category.id;
        /* Si aucune oeuvre de l'artiste ne rentre dans la catégorie :
        Le bouton sera caché */
        if (!categories.has(category.name)) {
            buttonFilterAttribute.class += " " + hiddenClass;
        }

        /* on l'ajoute aux enfants de l'élement div filtre */
        listedivFilter.push(createElement("button", buttonFilterAttribute, buttonFilterText));
    }

    /* on rattache les enfants au block figureElement */
    listedivFilter.forEach(element => divFilter.appendChild(element));

    /* on insère le bloc filtre après le titre */
    titreElement.insertAdjacentElement("afterend", divFilter);

}

/**
 * Cette fonction récupère les boutons du portfolio qui ont la classe 'filter-button'
 * Elle ajoute un EventListener afin d'écouter le click
 * Au clik, elle appelle la fonction modifiant l'affichage de la galerie, 
 * puis celle modifiant l'état des boutons filtres
 */
export function filterButtonEventListener() {

    /* Récupération des boutons du bloc filtre */
    let listeButtonElement = document.querySelectorAll("#portfolio .filter-button")

    /* Ajout des event listener */
    for (let i = 0; i < listeButtonElement.length; i++) {
        listeButtonElement[i].addEventListener("click", async (event) => {
            const dataSetId = event.target.dataset.id;
            const worksFilter = await filterGallery(dataSetId);
            initMainGallery(worksFilter);
            changeButtonSelected(listeButtonElement, dataSetId)
        })
    }
}

/**
 * Cette fonction met à jour l'état de sélection d'une liste de boutons.
 *
 * Parcourt tous les boutons du tableau :
 * - ajoute la classe `filter-button-selected` au bouton dont
 *   l'attribut `data-id` correspond à l'identifiant fourni ;
 * - retire cette classe de tous les autres boutons.
 *
 * Cette fonction garantit qu'un seul bouton est marqué comme sélectionné.
 *
 * @param {HTMLElement[]} listeButtonElement 
 * @param {string} dataSetId 
 */

function changeButtonSelected(listeButtonElement, dataSetId) {
    for (let i = 0; i < listeButtonElement.length; i++) {
        if (listeButtonElement[i].dataset.id === dataSetId) {
            listeButtonElement[i].classList.add(filterSelectedClass);
        } else {
            listeButtonElement[i].classList.remove(filterSelectedClass);

        }
    }
}

/**
 * cette fonction reçoit une oeuvre en paramètre et 
 * l'insère à la fin de la gallerie
 * @param {object} work  
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
 */
export function addWorkGallery(work) {

    /* on récupère l'id du filtre sélectionné de la page */
    let buttonFilterSelected = document.querySelector("#portfolio .filter-button-selected");
    let idFiltre = buttonFilterSelected.dataset.id;

    /* on vérifie que la nouvelle oeuvre correspond bien au flitre en cours 
    avant de l'ajouter */
    if ((idFiltre === "all") || (work.categoryId === idFiltre)) {
        /* créeation du nouvel élément HTML */
        const figureElement = createWorkGallery(work);
        /* ajout de la légende */
        addFigcaption(figureElement);

        /* Récupération de l'élément du DOM qui accueillera les oeuvres */
        const divGallery = document.querySelector("#portfolio .gallery");

        /* on rattache la figure à la div gallery */
        divGallery.appendChild(figureElement);
    }
}

/**
 * Cette fonction reçoit l'id d'une oeuvre à supprimer.
 * Elle appelle la fonction qui va requêter l'API
 * En cas de succès, elle appelle la fonction qui va supprimer 
 * l'ensemble des oeuvres correspondant à cette id du site
 * @param {number} id : id de l'oeuvre à supprimer
 */
async function deleteWorkManagement(id) {

    // on appelle la fonction qui va requeter l'API pour supprimer 
    // l'élement correspondant à l'id reçu en entrée
    const reponse = await deleteWork(id);
    // si la requête est un succès
    if (reponse.etat) {
        console.log(deleteAPIWork.successfull);
        removeElementBydataId("figure", id);
    } else {
        console.log(deleteAPIWork.failed);
    }
}
