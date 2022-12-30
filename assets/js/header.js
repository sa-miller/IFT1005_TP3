/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

// updateCount change la quantité de produits dans le panier affiché sur les pages du site

function updateCount(qtProducts) {
    let count = $(".count"); // sélecteur d'élément contenant la quantité de produits

    // s'il n'y a aucun produit dans le panier, on cache l'élément
    // sinon, on affiche l'élément contenant la quantité de produits et on sauvegarde la quantité
    
    if (qtProducts == 0) {
        count.hide();
        localStorage.removeItem('qtProducts');
    } else {
        count.show();
        count.html(qtProducts);
        localStorage.setItem('qtProducts', JSON.stringify(qtProducts));
    }
}

// getQtProduits obtient la quantité de produits dans le panier du local storage

function getQtProducts() {
    // quantité de produits sauvegardée dans le local storage
    let qtProducts = JSON.parse(localStorage.getItem('qtProducts'));

    // retour de la quantité de produits

    if (qtProducts == null) {
        qtProducts = 0;
    }

    return parseInt(qtProducts)
}

// premier affichage de produits lors du chargement des pages

updateCount(getQtProducts())