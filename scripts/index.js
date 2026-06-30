import { getWorks, getCategories } from "./api.js";
import { generateGallery, generateFilterCategory, filterButtonEventListener, logEventListener } from "./dom.js";
import { recoveryFilterCategoryElements } from "./data.js";


/* ------------ GESTION DE LA GALLERIE ------------ */

// on récupére toutes les oeuvres de l'artiste
const works = await getWorks();

// on réinitialise la galerie
generateGallery(works);

/* ------------ GESTION DES FILTRES DE LA GALLERIE ------------ */

// on récupère l'ensemble des catégories
const listCategories = await getCategories();

/* on récupére les différentes catégories présentes dans les oeuvres 
 de l'artiste */
let categories = recoveryFilterCategoryElements(works);

// on crée les filtres de la gallerie
generateFilterCategory(categories, listCategories);

// on ajoute un eventlistener sur les boutons filtres
filterButtonEventListener();

/* ------------ GESTION DE LA CONNEXION ------------ */

// on appelle la fonction qui gère le lien login/logout 
// en lui précisant la page actuelle
logEventListener("index.html");