produits       = {}
dernierFiltre  = pasDeFiltre
dernierTri     = triPrixBasHaut

function filtrerProduits (produit, categorie) {
    if ( categorie == "all" ) {
        return true
    } else {
        return produit.category == categorie;
    }
}

function filtrerCameras (produit) {
    return filtrerProduits (produit, "cameras")
}

function filtrerConsoles (produit) {
    return filtrerProduits (produit, "consoles")
}

function filtrerEcrans (produit) {
    return filtrerProduits (produit, "screens")
}

function filtrerOrdinateurs (produit) {
    return filtrerProduits (produit, "computers")
}

function pasDeFiltre (produit) {
    return filtrerProduits (produit, "all")
}

function triPrixBasHaut (productA, productB) {
    return productA.price - productB.price;
}

function triPrixHautBas (productA, productB) {
    return productB.price - productA.price;
}

function triNomAZ (productA, productB) {
    return productA.name.localeCompare(productB.name);
}

function triNomZA (productA, productB) {
    return productB.name.localeCompare(productA.name);
}

function toggleSelected(id) {
    $('#' + id).find('.selected').removeClass('selected')
    event.target.className += " selected"
}

function displayProduits(produits, tri, filtre) {
    if ( tri != dernierTri ) {
        toggleSelected('product-criteria');
    } else if (filtre != dernierFiltre) {
        toggleSelected('product-categories')
    }

    produits = produits.filter(filtre).sort(tri)
    dernierFiltre = filtre
    dernierTri = tri

    $('#products-count').html(produits.length + " produits")

    listeProduits = $('#products-list')

    listeProduits.empty()
    produits.forEach((produit) => {
        listeProduits.append(
            `<a class="productContentStyle" href="./product.html?id=${produit.id}" title="En savoir plus...">
                <h2 class="productTitleStyle">${produit.name}</h2>
                <img alt="${produit.name}" src="./assets/img/${produit.image}">
                <p class="productPriceStyle"><small>Prix</small> ${produit.price}&thinsp;$</p>
            </a>`
        );
    });
}

$.ajax({
    url: './data/products.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        produits = data;
        displayProduits(produits, dernierTri, dernierFiltre);
    },
    error: (error) => {
        console.log(error);
    }
});