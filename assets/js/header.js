/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

// 23 décembre
//
// Ce code contient les fonctions permettant d'obtenir le nombre de produits du local storage et de l'afficher

// miseAJourCount change la quantité de produits dans le panier affiché sur les pages du site

function miseAJourCount(qtProduits) {
    count = $(".count");

    if (qtProduits == 0) {
        count.hide();
    } else {
        count.show();
        count.html(qtProduits);
    }

    localStorage.setItem('qtProduits', JSON.stringify(qtProduits));
}

// getQtProduits obtient le nombre de produits dans le panier du local storage

function getQtProduits() {
    let qtProduits = JSON.parse(localStorage.getItem('qtProduits'));

    if (qtProduits == null) {
        qtProduits = 0;
    }
    return parseInt(qtProduits)
}

// premier affichage de produits lors du chargement des pages

miseAJourCount(getQtProduits())