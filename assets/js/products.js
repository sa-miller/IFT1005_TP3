/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

// 23 décembre
//
// Ce code permet le fonctionnement de la page affichant tous les produits selon certains critères de recherche

dernierFiltre  = pasDeFiltre    // filtre utilisé le plus récent
dernierTri     = triPrixBasHaut // tri utilisé le plus récent

// filtrerProduits est une fonction générale pour déterminer si un produit est dans une certaine catégorie

function filtrerProduits(produit, categorie) {
    if (categorie == "all") {
        return true;
    } else {
        return produit.category == categorie;
    }
}

// fonctions qui déterminent si un produit est dans une catégorie en particulier

function filtrerCameras(produit) {
    return filtrerProduits(produit, "cameras");
}

function filtrerConsoles(produit) {
    return filtrerProduits(produit, "consoles");
}

function filtrerEcrans(produit) {
    return filtrerProduits(produit, "screens");
}

function filtrerOrdinateurs(produit) {
    return filtrerProduits(produit, "computers");
}

function pasDeFiltre(produit) {
    return filtrerProduits(produit, "all");
}

// fonctions qui servent à trier les produits en fonction d'un certain critère
// elles sont utilisées avec sort()

function triPrixBasHaut(productA, productB) {
    return productA.price - productB.price;
}

function triPrixHautBas(productA, productB) {
    return productB.price - productA.price;
}

function triNomAZ(productA, productB) {
    return productA.name.localeCompare(productB.name);
}

function triNomZA(productA, productB) {
    return productB.name.localeCompare(productA.name);
}

// toggleSelected désélectionne un élément sélectionné précédemment et sélectionne celui
// qui a été sélectionné le plus récemment

function toggleSelected(id) {
    $('#' + id).find('.selected').removeClass('selected');
    event.target.className += " selected";
}

// displayProduits affiche les produits selon les fonctions de filtre et de tri données

function displayProduits(produits, tri, filtre) {
    // changement de filtre/tri affiché comme filtre/tri sélectionné s'il y a un changement

    if (tri != dernierTri) {
        toggleSelected('product-criteria');
    } else if (filtre != dernierFiltre) {
        toggleSelected('product-categories');
    }

    // tri et filtre de produits
    // sauvegarde du dernier tri et filtre utilisés

    produits = produits.filter(filtre).sort(tri);
    dernierFiltre = filtre;
    dernierTri = tri;

    // mise à jour du nombre total de produits affichés

    $('#products-count').html(produits.length + " produits");

    // affichage des produits

    listeProduits = $('#products-list');

    listeProduits.empty();
    produits.forEach((produit) => {
        listeProduits.append(
            `<a class="productContent" href="./product.html?id=${produit.id}" title="En savoir plus...">
                <h2 class="productTitle">${produit.name}</h2>
                <img alt="${produit.name}" src="./assets/img/${produit.image}">
                <p class="productPrice"><small>Prix</small> ${produit.price}&thinsp;$</p>
            </a>`
        );
    });
}

// $.ajax obtient la liste de produits à partir du fichier JSON la contenant, puis affiche tous les produits en ordre croissant de prix

$.ajax({
    url: './data/products.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        produits = data; // tableau contenant les produits à afficher
        displayProduits(produits, dernierTri, dernierFiltre);
    },
    error: (error) => {
        console.log(error);
    }
});