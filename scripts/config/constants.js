/*********************************************************************************
 * 
 * Ce fichier contient les constantes. 
 * 
 *********************************************************************************/


/* Constantes de gestions de l'élement login/logout du Header */
export const login = {
    texte: "login",
    class: "js-login"
};

export const logout = {
    texte: "logout",
    class: "js-logout"
};

/* Constantes de gestion des class et 
texte du bouton de la modale suivant la page */
export const addWork = {
    texte: "Ajouter une photo",
    class: "js-addWork"
};

export const submitPost = {
    texte: "Valider",
    class: "js-submit-post"
};

/* Constantes de gestion des class du bloc principal 
de la modale suivant la page */
export const deleteWorks = {
    texte: null,
    class: "modal-delete-work"
};

export const postWorks = {
    texte: null,
    class: "modal-post-work"
};

/* Constantes de gestions des titres des pages de la modal */
export const modalTitle = {
    deleteWorks: "Galerie photo",
    postWorks: "Ajout photo"
};

/* Constantes de gestions des class des pages de la modal */
export const modalPages = {
    delete: "deleteWork",
    add: "addWork"
}

/* Constantes des icones Buttons */
export const deleteButton = {
    classBouton: "logo-delete-work",
    classIcone: "fa-solid fa-trash-can",
    ariaLabel: "Delete work"
}

export const previousButton = {
    classBouton: "logo logo-previous-page",
    classIcone: "fa-solid fa-arrow-left",
    ariaLabel: "Previous page"
}

export const closeButton = {
    classBouton: "logo logo-close-cross",
    classIcone: "fa-solid fa-xmark",
    ariaLabel: "Close page"
}