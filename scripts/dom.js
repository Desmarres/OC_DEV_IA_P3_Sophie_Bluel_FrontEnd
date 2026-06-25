/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à la manipulation du DOM. 
 * 
 *********************************************************************************/

import { filterGallery } from "./data.js";

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
export function generateGallery(works) {

    // Récupération de l'élément du DOM qui accueillera les oeuvres
    const divGallery = document.querySelector("#portfolio .gallery");
    // Initialisation de la div
    divGallery.innerHTML = "";

    // pour chaque élément de la liste, on va créer une fiche de l'oeuvre
    for (let i = 0; i < works.length; i++) {

        // on récupère l'élement pour créer la fiche de l'oeuvre
        let figure = works[i];

        // création des balises figure, image et figcaption
        let figureElement = document.createElement("figure");
        let imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;
        let figCaptionElement = document.createElement("figcaption");
        figCaptionElement.textContent = figure.title;

        // on rattache l'image et le figcaption à la figure
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figCaptionElement);

        // on rattache la figure à la div gallery
        divGallery.appendChild(figureElement);
    }
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

    console.log(categories)
    console.log(listCategories)
    // récupéraration de l'élément titre  qui précéde le bloc filtre
    const titreElement = document.querySelector("#portfolio h2");

    // création du block filtre
    const divFilter = document.createElement("div");
    divFilter.classList.add("filter");

    // création du premier bouton qui est actif par défaut
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.textContent = "Tous";
    // attribution d'un data-id pour identifier le filtre
    buttonElement.dataset.id = "all";
    // attribution des class pour la manipulation du CSS
    buttonElement.classList.add("filter-button-selected");
    buttonElement.classList.add("filter-button");

    // on rattache le premier filtre au bloc filtre
    divFilter.appendChild(buttonElement);

    // on balaye les catégories pour ajouter les autres boutons
    for (let category of listCategories) {

        // création du bouton
        buttonElement = document.createElement("button");
        buttonElement.type = "button";
        buttonElement.textContent = category.name;
        // attribution d'un data-id pour l'identifier
        buttonElement.dataset.id = category.id;
        // attribution des class pour la manipulation du CSS
        buttonElement.classList.add("filter-button");
        // Si aucune oeuvre de l'artiste ne rentre dans la catégorie :
        // Le bouton sera caché
        if (!categories.has(category.name)) {
            buttonElement.classList.add("display-none");
        }

        // on rattache le filtre au bloc filtre
        divFilter.appendChild(buttonElement);
    }

    // on insère le bloc filtre après le titre
    titreElement.insertAdjacentElement("afterend", divFilter);

}

export function filterButtonEventListener() {

    // Récupération des boutons du bloc filtre
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

function changeButtonSelected(listeButtonElement, dataSetId) {
    for (let i = 0; i < listeButtonElement.length; i++) {
        if (listeButtonElement[i].dataset.id === dataSetId) {
            listeButtonElement[i].classList.add("filter-button-selected");
        } else {
            listeButtonElement[i].classList.remove("filter-button-selected");

        }
    }
}