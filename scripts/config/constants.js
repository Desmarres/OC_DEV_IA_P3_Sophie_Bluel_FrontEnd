/*********************************************************************************
 * 
 * Ce fichier contient les constantes. 
 * 
 *********************************************************************************/


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

/* -------------- Modale suivant la page delete ou post Work  -------------- */

/* Class et texte du bouton ADD ou Submit de la modale */
export const addWork = {
    texte: "Ajouter une photo",
    class: "js-addWork"
};

export const submitPost = {
    texte: "Valider",
    class: "submit-disabled"
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
}

export const imageTypeAllowed = ["image/jpeg", "image/png"];
export const imageMaxSize = 4; /* En Mo */
export const ONE_MO = 1024 * 1024;

export const imageRestriction = {
    "fileType": imageTypeAllowed,
    "size": imageMaxSize
}

