import { getWorks, getCategories } from "./api.js";
import { generateGallery, generateFilterCategory, filterButtonEventListener } from "./dom.js";
import { recoveryFilterCategoryElements } from "./data.js";



// récupération de toutes les oeuvres de l'artiste
const works = await getWorks();

// réinitialisation de la galerie
generateGallery(works);

// récupératrion des différentes catégories présentes dans les oeuvres 
// de l'artiste
let categories = recoveryFilterCategoryElements(works);

// récupération de toutes les catégories
const listCategories = await getCategories();

// création des filtres
generateFilterCategory(categories, listCategories);

// ajout d'un eventlistener sur les boutons filtres
filterButtonEventListener();