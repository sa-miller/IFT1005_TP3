$.urlParam = function(name){
    var results = new RegExp('[\?]' + name + '=([^]*)').exec(window.location.href);
    if ( results == null ) {
        return null;
    } else {
        return results[1] || 0;
    }
}

function displayProduit(produits){
    const produit = produits.find(prod => prod.id == $.urlParam('id'));
    const features = produit.features

    $('#product-title').text(produit.name);
    $('#product-image').attr('src', './assets/img/' + produit.image);
    $('#product-description').text(produit.description);
    
    listeCaracts = $('#product-features')

    listeCaracts.empty()

    features.forEach((feature) => {
        listeCaracts.append(
            `<li>` + feature + `</li>`
        );
    });
}

$.ajax({
    url: './data/products.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        produits = data;
        displayProduit(produits);
    },
    error: (error) => {
        console.log(error);
    }
});