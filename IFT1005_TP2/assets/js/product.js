// Samuel Miller
// Malik Abada
// Joseph Finan
//
// 23 décembre
//
// Ce code permet le fonctionnement de la page affichant un produit en particulier et permettant de l'ajouter au panier

// $.urlParam permet d'obtenir un id passé dans l'URL avec ?id=(id)

$.urlParam = function(name){
    var resultat = new RegExp('[\?]' + name + '=([^]*)').exec(window.location.href);
    if (resultat == null) {
        return null;
    } else {
        return resultat[1] || 0;
    }
}

// id du produit à afficher

var id =  $.urlParam('id');

// displayProduit affiche un produit selon une liste de produits et l'id obtenu ci-haut

function displayProduit(produits){
    // on trouve le produit correspondant à l'id donné dans la liste de produits
    // si fin de URL invalide ou produit non trouvé, on affiche "page non trouvée!"

    const produit = produits.find(prod => prod.id == id);
    if (produit == undefined) {
        $(".colProduct").empty();
        $("#productTitle").text("Page non trouvée!");
    } else {
        // sinon, on affiche le produit et ses détails correspondants

        const features = produit.features;

        $("#productTitle").text(produit.name);
        $("#productImage").attr('src', './assets/img/' + produit.image);
        $("#productDescription").text(produit.description);
        $("#productPrice").text(produit.price + " $")
    
        // affichage des caractéristiques du produit

        listeCaracts = $('#productFeatures');
        listeCaracts.empty();

        features.forEach((feature) => {
            listeCaracts.append(`<li>` + feature + `</li>`);
        });
    }
}

// le code ci-bas fais la gestion de l'ajout du produit après avoir cliqué le bouton "ajouter"

$("#ajouterProduit").submit((event) => {
    event.preventDefault()
    
    // quantité de produit entrée par l'utilisateur et panier stocké dans le local storage

    const quantiteAjout = $("#quantiteProduit").val();
    let panier          = JSON.parse(localStorage.getItem('panier'));

    // s'il n'y a pas de panier dans le local storage, panier est un tableau vide

    if (panier == null) {
        panier = [];
    }

    // produit à ajouter au panier et incrémentation de la quantité du produit dans le panier
    // (getQtProduits() vient de miseAJourCount.js)

    const produit = panier.find((produit) => produit.id == id);
    var qtProduits = getQtProduits() + parseInt(quantiteAjout);

    // si le produit est déjà dans le panier, on incrémente sa quantité
    // sinon, on l'ajoute au panier

    if (produit != null){
        produit.quantite = parseInt(produit.quantite) + parseInt(quantiteAjout);
    } else {
        panier.push({
            id: id,
            quantite: quantiteAjout,
        });
    }

    // stockage du panier

    localStorage.setItem('panier', JSON.stringify(panier));
    
    // mise à jour de la quantité de produits dans le panier affichée et affichage d'un dialogue de confirmation

    miseAJourCount(qtProduits);
    $("#dialog").show();
    setTimeout(() => { $("#dialog").hide() }, 5000);
    
})

// $.ajax obtient la liste de produits à partir du fichier JSON la contenant, puis fait afficher le produit

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