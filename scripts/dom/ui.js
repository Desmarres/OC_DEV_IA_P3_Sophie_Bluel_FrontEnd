/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions qui concerne l'interface utilisateur. 
 * 
 *********************************************************************************/


/**
 * Cette fonction reçoit une balise en paramètre et le texte de la balise.
 * Elle ajoute une balise img avec le logo modifier, ainsi qu'une balise p avec le texte.
 * @param {HTMLElement} HTMLElement : l'élément parent acceuillant le logo modifier et le texte
 * @param {string} texte : texte à afficher dans le block
 */
export function createBlockModifier(HTMLElement, texte) {

    // on crée l'image du logo de l'édition
    let iconeElement = document.createElement("i");
    iconeElement.classList.add("fa-regular");
    iconeElement.classList.add("fa-pen-to-square");
    iconeElement.classList.add("logo-edit");

    // on crée le paragraphe avec le texte
    let pElement = document.createElement("p");
    pElement.textContent = texte;

    // on assemble le bloc lien
    HTMLElement.appendChild(iconeElement);
    HTMLElement.appendChild(pElement);
}


/**
 * cette fonction modifie un élément du DOM en supprimant une class puis en ajoutant une autre.
 * Il modifie également le texte de l'élément si le paramètre est renseigné
 * @param {HTMLElement} HTMLElement : l'élément concerné par le changement de class et de texte
 * @param {string} oldClass : la classe a supprimer
 * @param {string} newClass : la class a ajouter
 * @param {string} newText : le nouveau contenu
 */

export function changeClass(HTMLElement, oldClass, newClass, newText = null) {

    // supprime la class reçu en paramètre
    HTMLElement.classList.remove(oldClass);
    // ajoute la class reçu en paramètre
    HTMLElement.classList.add(newClass);
    // si il y a du texte en paramètre, il le modifie dans l'élément
    if (newText !== null) HTMLElement.textContent = newText;
}

/**
 * Cette fonction ajoute la bar noir indiquant le mode edition
 */
export function addBlackBarEditMode() {

    // on récupère le body
    const body = document.querySelector("body");

    // on crée un block qui va acceuillir les éléments modifiés
    let blackBar = document.createElement("div");
    blackBar.classList.add("black-bar");

    //on appelle la fonction qui va créer les éléments HTML interne à la balise
    createBlockModifier(blackBar, "Mode édition");

    // on ajoute le bloc avant le header
    body.insertAdjacentElement("afterbegin", blackBar);

    // on décale le header
    body.classList.add("padding-top-40");

}

/**
 * Cette fonction supprime la bar noir indiquant le mode edition
 */
export function removeBlackBarEditMode() {

    // on récupère le body
    const body = document.querySelector("body");

    // on récupère l'élément black-bar et on le supprime
    const blackBar = document.querySelector(".black-bar");
    blackBar.remove();

    // on retire le décalage du header
    body.classList.remove("padding-top-40");

}