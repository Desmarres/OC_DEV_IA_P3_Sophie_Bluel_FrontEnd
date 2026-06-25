import { getWorks } from "./api.js";
import { generateGallery, generateFilterCategory } from "./dom.js";
import { recoveryFilterCategoryElements } from "./data.js";



// récupération de toutes les oeuvres de l'artiste
const works = await getWorks();

// réinitialisation de la gallerie
generateGallery(works);

// récupératrion des différentes catégories présentes dans les oeuvres 
// de l'artiste
let categories = recoveryFilterCategoryElements(works);

// création des filtres
generateFilterCategory(categories);