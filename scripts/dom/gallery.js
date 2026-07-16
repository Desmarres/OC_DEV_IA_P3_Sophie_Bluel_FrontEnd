/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne la partie gallery. 
 * 
 *********************************************************************************/

import { filterGallery } from "../services/data.js";
import { createElement } from "./ui.js";
import { divFilterAttribute, buttonFilterDefaultAttribute } from "../config/attributs.js";
import { hiddenClass, filterSelectedClass } from "../config/constants.js";
import { buttonFilterTousText } from "../config/text.js";


/**
 * Cette fonction récupère en pramètre un tableau d'oeuvre
 * Elle vide le bloc div "gallery" pour afficher les éléments reçus en paramètre
 * @param {object} works : [{  
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
export function generateMainGallery(works) {

    /* Récupération de l'élément du DOM qui accueillera les oeuvres */
    const divGallery = document.querySelector("#portfolio .gallery");
    /* Initialisation de la div */
    divGallery.innerHTML = "";

    /* pour chaque élément de la liste, on va créer une fiche de l'oeuvre */
    works.forEach(work => {

        /* on appelle la fonction qui va créer l'élément figure avec l'oeuvre */
        const figureElement = createWorkGallery(work);

        /* on rattache la figure à la div gallery */
        divGallery.appendChild(figureElement);
    })
}

/**
 * Cette fonction reçoit une oeuvre en entrée et 
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
function createWorkGallery(work) {

    /* création des balises figure, image et figcaption */
    let figureElement = document.createElement("figure");
    /* attribution d'un data-id pour identifier l'oeuvre */
    figureElement.dataset.id = work.id;

    /* création de l'image de l'oeuvre */
    let imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    /* création de lélément titre de l'oeuvre */
    let figCaptionElement = document.createElement("figcaption");
    figCaptionElement.textContent = work.title;

    /* on rattache l'image et le figcaption à la figure */
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figCaptionElement);

    return figureElement;
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
        listeButtonElement[i].addEventListener("click", (event) => {
            const dataSetId = event.target.dataset.id;
            filterGallery(dataSetId);
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

        /* Récupération de l'élément du DOM qui accueillera les oeuvres */
        const divGallery = document.querySelector("#portfolio .gallery");

        /* on rattache la figure à la div gallery */
        divGallery.appendChild(figureElement);
    }
}

