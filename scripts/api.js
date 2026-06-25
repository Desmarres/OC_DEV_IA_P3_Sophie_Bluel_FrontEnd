/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au requête API. 
 * 
 *********************************************************************************/


/**
 * 
 * 
 * @returns {object} : [{
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
export async function getWorks() {
    // appel de l'API avec la requête GET pour récupérer l'ensemble des oeuvres
    const reponse = await fetch("http://localhost:5678/api/works");
    // production de l'objet JS à partir de la réponse 
    const works = await reponse.json();
    return works;
}


/**
 * 
 * 
 * @returns {object} : [{
                        "id": number,
                        "name": string
                        }]
                            
 */
export async function getCategories() {
    // appel de l'API avec la requête GET pour récupérer l'ensemble des oeuvres
    const reponse = await fetch("http://localhost:5678/api/categories");
    // production de l'objet JS à partir de la réponse 
    const categories = await reponse.json();
    return categories;
}