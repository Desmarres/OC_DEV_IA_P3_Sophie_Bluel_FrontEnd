/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à la manipulation du DOM. 
 * 
 *********************************************************************************/

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
 * Cette fonction récupère en pramètre une liste de catégorie
 * Elle crée un bloc après le h2 du portfolio et afficher les éléments 
 * reçus en paramètre en ajoutant un fitre "Tous"
 * @param {string[]} categories Liste des catégories.
 */
export function generateFilterCategory(categories) {

    // récupéraration de l'élément titre  qui précéde le bloc filtre
    const titreElement = document.querySelector("#portfolio h2");

    // création du block filtre
    const divFilter = document.createElement("div");

    // création du premier bouton qui est actif par défaut
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.textContent = "Tous";
    buttonElement.classList.add("filter-button-selected");
    buttonElement.classList.add("filter-button");

    // on rattache le premier filtre au bloc filtre
    divFilter.appendChild(buttonElement);

    // on balaye les catégories pour ajouter les autres boutons
    for (let category of categories) {

        // création du bouton
        buttonElement = document.createElement("button");
        buttonElement.type = "button";
        buttonElement.textContent = category;
        buttonElement.classList.add("filter-button");

        // on rattache le filtre au bloc filtre
        divFilter.appendChild(buttonElement);
    }

    // on insère le bloc filtre après le titre
    titreElement.insertAdjacentElement("afterend", divFilter);


}