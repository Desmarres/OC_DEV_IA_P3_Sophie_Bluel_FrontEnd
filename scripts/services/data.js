/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions manipulant les données. 
 * 
 *********************************************************************************/

import { getWorks } from "./api.js";
import { generateGallery } from "../dom/gallery.js";
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

/**
 * Cette fonction reçoit un email en entrée et renvoie true si elle est valide 
 * ou false si elle est invalide
 * @param {string} email 
 * @returns {boolean}
 */
export function validateEmail(email) {

    /* Initialisation de l'Expression Régulière
    Elle refuse les adresses mails qui : 
        - commence par un point
        - qui ont deux points consécutifs
    Elle accepte les adresses :
        - pour la partie local : 
            - qui a au moins 1 caractère alphanumérique
            - qui commençe et termine par 1 caractère alphanumérique
            - qui a des carctères _+.-
        - pour la partie nom de domaine qui peut être répété jusqu'à 3 fois : 
            - qui a au moins 1 caractère alphanumérique
            - qui commençe et termine par 1 caractère alphanumérique
            - qui a des carctères _+.-
        - pour l'extension du nom de domaine : 
            - précédé d''un point
            - qui a entre 2 et 5 caractères alphanumériques
    */
    let emailRegExp = new RegExp("^(?!.*\\.\\.)(\w|[a-zA-Z1-9][a-zA-Z1-9_+.-]*\\w)@(\\w|\\w[a-zA-Z1-9_+.-]*\\w){1,3}\\.\\w{2,5}$");
    return emailRegExp.test(email);
}

/**
 * Cette fonction reçoit un password en entrée et renvoie true si il est valide 
 * ou false si il est invalide
 * @param {string} password 
 * @returns {boolean}
 */
export function validatePassword(password) {

    /* Initialisation de l'Expression Régulière
    Elle refuse les mots de passe : 
        - simple du type 'password', 'PASSWORD' ou suite de nombre
        - qui commence par $, qui contient un espace, ou les symboles du type <,>,',",;,/
        */
    let ppasswordRegExp = new RegExp("(?!^password$|^PASSWORD$|^0?1?2?3?4?5?6?7?8?9?$|admin|^\\$)^[a-zA-Z0-9!#$@_&+?%-]*$")
    return ppasswordRegExp.test(password)
}