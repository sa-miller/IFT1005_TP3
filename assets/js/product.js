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

// ($.urlParam() provient de urlParam.js)

var id = $.urlParam('id'); // id du produit à afficher

// displayProduct affiche un produit selon une liste de produits et l'id obtenu ci-haut

function displayProduct(products){
    // produit correspondant à l'id donné dans la liste de produits
    const product = products.find(prod => prod.id == id);

    // si fin de URL invalide ou produit non trouvé, on affiche "Page non trouvée!"

    if (product == undefined) {
        $(".colProduct").empty();
        $("#productTitle").text("Page non trouvée!");
    } else {
        // sinon, on affiche le produit et ses détails correspondants

        // affichage des détails du produit

        $("#productTitle").text(product.name);
        $("#productImage").attr('src', './assets/img/' + product.image);
        $("#productDescription").text(product.description);
        $("#productPrice").text(product.price + " $");
    
        // affichage des caractéristiques du produit

        const featureList = $('#productFeatures'); // sélecteur de la liste de caractéristiques
        featureList.empty();                       // on vide la liste pour afficher la nouvelle liste

        // affichage de chaque caractéristique dans la liste

        product.features.forEach((feature) => {
            featureList.append(`<li>` + feature + `</li>`);
        });
    }
}

// le code ci-bas fait la gestion de l'ajout du produit après avoir cliqué le bouton "ajouter"

$("#addProduct").submit((event) => {
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem('cart')); // tableau contenant les produits dans le panier

    // s'il n'y a pas de panier dans le local storage, cart est un tableau vide

    if (cart == null) {
        cart = [];
    }

    // (getQtProducts() et updateCount proviennent de header.js)

    const addedQt = $("#qtProduct").val();                    // quantité de produit entrée par l'utilisateur
    const product = cart.find((product) => product.id == id); // produit à ajouter au panier

    // si le produit est déjà dans le panier, on incrémente sa quantité

    if (product != null){
        product.quantite = parseInt(product.quantite) + parseInt(addedQt);
    } else {
        // sinon, on l'ajoute au panier

        cart.push({
            id: id,
            quantite: addedQt,
        });
    }

    // sauvegarde du panier

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // mise à jour de la quantité de produits affichée et affichage d'un dialogue de confirmation

    updateCount(getQtProducts() + parseInt(addedQt));
    $("#dialog").show();
    setTimeout(() => { $("#dialog").hide() }, 5000);
})

// $.ajax obtient la liste de produits à partir du fichier JSON la contenant, puis fait afficher le produit

$.ajax({
    url: './data/products.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        products = data;
        displayProduct(products);
    },
    error: (error) => {
        console.log(error);
    }
});