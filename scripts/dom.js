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
