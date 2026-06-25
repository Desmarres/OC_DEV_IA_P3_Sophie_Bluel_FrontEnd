/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions manipulant les données. 
 * 
 *********************************************************************************/

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