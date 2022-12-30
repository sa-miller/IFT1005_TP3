/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

/** Note: Ce project a été testé en utilisant l'extension Live Server de VSCode et
*         doit être lu/exécuté avec un serveur local (Live Server VSCode, Node JS). -->
*/

var lastFilter = noFilter;           // filtre utilisé le plus récent
var lastSort   = sortPriceBottomTop; // tri utilisé le plus récent

// filterProducts est une fonction générale pour déterminer si un produit est dans une certaine catégorie

function filterProducts(product, category) {
    if (category == "all") {
        return true;
    } else {
        return product.category == category;
    }
}

// fonctions qui déterminent si un produit est dans une catégorie particulière
// elles sont utilisées avec filter()

function filterCameras(product) {
    return filterProducts(product, "cameras");
}

function filterConsoles(product) {
    return filterProducts(product, "consoles");
}

function filterScreens(product) {
    return filterProducts(product, "screens");
}

function filterComputers(product) {
    return filterProducts(product, "computers");
}

function noFilter(product) {
    return filterProducts(product, "all");
}

// fonctions qui servent à trier les produits en fonction d'un certain critère
// elles sont utilisées avec sort()

function sortPriceBottomTop(productA, productB) {
    return productA.price - productB.price;
}

function sortPriceTopBottom(productA, productB) {
    return productB.price - productA.price;
}

function sortNameAZ(productA, productB) {
    return productA.name.localeCompare(productB.name);
}

function sortNameZA(productA, productB) {
    return productB.name.localeCompare(productA.name);
}

// toggleSelected désélectionne un élément sélectionné précédemment
// et sélectionne celui qui a été sélectionné le plus récemment

function toggleSelected(idPrevious, idClick) {
    $('#' + idPrevious).find('.selected').removeClass('selected');
    $('#' + idClick).addClass('selected');
}

// displayProducts affiche les produits selon les fonctions de filtre et de tri données

function displayProducts(products, productsSort, productsFilter, idClick) {
    // changement de filtre/tri affiché comme filtre/tri sélectionné s'il y a un changement

    if (productsSort != lastSort) {
        toggleSelected('product-criteria', idClick);
    } 
    if (productsFilter != lastFilter) {
        toggleSelected('product-categories', idClick);
    }

    products = products.filter(productsFilter).sort(productsSort); // tri et filtre des produits
    lastFilter = productsFilter;                                   // sauvegarde du dernier filtre utilisé
    lastSort = productsSort;                                       // sauvegarde du dernier tri utilisé

    // mise à jour du nombre total de produits affichés

    $('#products-count').html(products.length + " produits");

    let productList = $('#products-list'); // sélecteur de la liste de produits

    // on vide la liste de produits affichée pour mettre la nouvelle
    productList.empty();

    // insertion et affichage de la liste de produits

    products.forEach((product) => {
        productList.append(
            `<a class="productContent" 
                href="./product.html?id=${product.id}" 
                title="En savoir plus...">

                <h2 class="productTitle">${product.name}</h2>
                <img alt="${product.name}" src="./assets/img/${product.image}">
                <p class="productPrice"><small>Prix</small> ${product.price}&thinsp;$</p>
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
        products = data; // tableau contenant les produits à afficher
        displayProducts(products, lastSort, lastFilter, null); // affichage des produits
    },
    error: (error) => {
        console.log(error);
    }
});