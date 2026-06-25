/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions manipulant les données. 
 * 
 *********************************************************************************/

import { getWorks } from "./api.js";
import { generateGallery } from "./dom.js";
/**
 * 
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
 * @returns {Set<Object>} Liste des catégories.
 */
export function recoveryFilterCategoryElements(works) {

    // initialisation de l'objet Set afin de récupérer des valeurs uniques
    let categories = new Set();

    // parcours les oeuvres et ajoute chaque catégorie à l'objet Set
    for (let work of works) categories.add(work.category.name);

    return categories;
}

/**
 * Cette fonstion récupère en paramètre l'Id de la catégorie à filtrer ou all 
 * pour toutes les catégories.
 * Elle filtre ou non les oeuvres et appelle la fonction qui regénère la gallery du site.
 * @param {string} categoryId : Valeur accepté all ou un nombre
 */
export async function filterGallery(categoryId) {

    // récupération de toutes les oeuvres de l'artiste
    const works = await getWorks();

    // Initialisation de la variaable des oeuvres filtrées
    let worksFilter = works;

    // Si on applique un filtre
    if (categoryId !== "all") {
        // on récupère les oeuvres dont l'id de la catégorie correspond à celle en paramètre
        worksFilter = works.filter(work => work.categoryId === parseInt(categoryId));
    }

    generateGallery(worksFilter);

}