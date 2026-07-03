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

    let userConnexion = {};

    // Vérification du succès de la requête
    if (await reponse.ok) {
        // préparation de la réponse avec le code 200 et les éléments en JS 
        userConnexion = {
            "status": reponse.status,
            "message": await reponse.json()
        };
    } else {
        // préparation de la réponse avec le code erreur (404 Not Found | 401 Not Authorized) 
        // et le message de l'erreur
        userConnexion = {
            "status": reponse.status,
            "message": reponse.statusText
        };
    }
    return userConnexion;
}

/**
 * Cette fonction reçoit l'id d'une oeuvre à supprimer et 
 * retourne un objet avec les réponses du serveur sur la réussite de la requête
 * @param {number} id : id de l'oeuvre à supprimer
 * @returns {object} : {
        "etat": reponse.ok,
        "statusText": reponse.statusText
    }
 */

export async function deleteWork(id) {

    // récupération du token d'identification
    const token = localStorage.getItem('token');

    // appel de l'API avec la méthode DELETE pour supprimer l'élément avec l'id reçu en paramètre
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });

    // préparation de la réponse avec l'état en booléan et la description
    const deleteReponse = {
        "etat": reponse.ok,
        "statusText": reponse.statusText
    };

    return deleteReponse;
}