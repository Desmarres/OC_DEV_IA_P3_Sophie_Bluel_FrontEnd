/*********************************************************************************
 * 
 * Ce fichier contient les textes des éléments HTML. 
 * 
 *********************************************************************************/

import { imageMaxSize, imageTypeAllowed } from "../config/constants.js";

/* -------------- Texte des éléments du formulaire de la modal  -------------- */

/* on crée un tableau avec uniquement les extensions authorizées */
const extensions = imageTypeAllowed
    .map(type => type.split("/")[1].replace("jpeg", "jpg"));

/* on récupère les restrictions pour éditer 
le texte info du bloc de chargement de la photo  */
export const pInfoPhotoText = `${extensions.join(", ")} : ${imageMaxSize}mo max`;

export const labelFileText = "+ Ajouter photo";

export const labelTitreText = "Titre";

export const labelCategoriesText = "Catégorie";

/* -------------- Texte des erreurs du formulaire de la modal  -------------- */

export const pInfoTitleError = {
    "vide": "Vous devez renseigner un titre",
    "errorRegExp": "Veuillez renseigner un titre valide, sans caractères spéciaux."
}

export const inputFileError = {
    "format": "Mauvais format de fichier",
    "size": "L'image est trop volumineux",
    "etatNull": "Veuillez ajouter une photo valide."
}

export const categoriesError = {
    "incorrectData": "Veuillez choisir une catégorie."
}
