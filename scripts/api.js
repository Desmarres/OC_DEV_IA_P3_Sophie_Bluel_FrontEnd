/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au requête API. 
 * 
 *********************************************************************************/


/**
 * Cette fonction récupère l'ensemble des oeuvres du serveur en requêtant l'API
 * Elle retourne le résultat sous forme d'un tableau d'objet
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
    // appel de l'API avec la méthode GET pour récupérer l'ensemble des oeuvres
    const reponse = await fetch("http://localhost:5678/api/works");
    // production de l'objet JS à partir de la réponse 
    const works = await reponse.json();
    return works;
}


/**
 * Cette fonction récupère l'ensemble des catégories disponibles sur le serveur
 * Elle retourne le résultat sous forme d'un objet
 * @returns {object} : [{
                        "id": number,
                        "name": string
                        }]
                            
 */
export async function getCategories() {
    // appel de l'API avec la méthode GET pour récupérer l'ensemble des catégories
    const reponse = await fetch("http://localhost:5678/api/categories");
    // production de l'objet JS à partir de la réponse 
    const categories = await reponse.json();
    return categories;
}

/**
 * Cette fonction envoi les donnée de connexion au serveur par le biai de l'API
 * Elle retourne le résultat sous forme d'un objet
 * @param {string} email 
 * @param {string} password 
 * @returns {object} : [{
                        "id": number,
                        "token": string
                        }]
 */
export async function postLogin(email, password) {

    // Création de l’objet pour la requête API
    const userControl = {
        email: email,
        password: password
    };

    // Modification de l'objet en chaine de caractère JSON 
    const userRequest = JSON.stringify(userControl);

    // appel de l'API avec la méthode POST pour authentifier la connexion
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userRequest
    });
    // production de l'objet JS à partir de la réponse 
    const userConnexion = await reponse.json();
    return userConnexion;
}