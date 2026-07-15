/*********************************************************************************
 * 
 * Ce fichier contient les constantes. 
 * 
 *********************************************************************************/

/* -------------- Générique  -------------- */

export const hiddenClass = "hidden";

export const errorClass = "errorText";

export const disabledClass = "disabled";

/* -------------- Header  -------------- */

/* Class et texte du lien login/logout du Header */
export const login = {
    texte: "login",
    class: "js-login"
};

export const logout = {
    texte: "logout",
    class: "js-logout"
};

/* -------------- Filtre  -------------- */

export const filterSelectedClass = "filter-button-selected";

/* -------------- Class des élément de la Modal  -------------- */

/* Class et texte du bouton ADD ou Submit de la modale */
export const addWork = {
    texte: "Ajouter une photo",
    class: "js-addWork"
};

export const submitPost = {
    texte: "Valider",
    class: "submit"
};

/* Class du modal-main */
export const deleteWorks = {
    texte: null,
    class: "modal-delete-work"
};

export const postWorks = {
    texte: null,
    class: "modal-post-work"
};

/* Titres des pages de la modal */
export const modalTitle = {
    deleteWorks: "Galerie photo",
    postWorks: "Ajout photo"
};

/* Class des pages de la modal */
export const modalPages = {
    delete: "deleteWork",
    add: "addWork"
};

export const imageTypeAllowed = ["image/jpeg", "image/png"];
export const imageMaxSize = 4; /* En Mo */
export const ONE_MO = 1024 * 1024;

export const imageRestriction = {
    "fileType": imageTypeAllowed,
    "size": imageMaxSize
};

