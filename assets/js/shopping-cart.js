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

// (getQtProducts() et updateCount proviennent de updateCount.js)

// toggleShownElement cache un élément et en affiche un autre

function toggleShownElement(idHideSelector, idShowSelector) {
    $(idHideSelector).hide();
    $(idShowSelector).show();
}

// emptyCart vide le panier

function emptyCart() {
    localStorage.removeItem("cart");                  // on vide le panier
    toggleShownElement("#cartContent", "#noItemDiv"); // on cache la liste de produits
    updateCount(0);                                // on ajuste la quantité de produits du panier en conséquence
}

// handleShoppingCartPage affiche la page du panier selon le contenu du panier

function handleShoppingCartPage(products){
    // si le panier n'est pas vide, on affiche les produits dans le panier
    if (localStorage.cart && localStorage.getItem('cart') != "[]") {
        showCartContentOnly(products);
    } else {
        emptyCart() // sinon, on vide le panier
    }
}

// emptyCartConfirm est appelée après avoir cliqué sur le bouton qui vide le panier
// elle demande la confirmation l'utilisateur avant de vider le panier

function emptyCartConfirm(){
    if (confirm("Voulez-vous supprimer tous les produits du panier?")) {
        emptyCart();
    }
}

// getDetailedCartItemsData obtient un tableau contenant les informations sur un produit dans le panier

function getDetailedCartItemsData(products, detailedCartItemData){
    JSON.parse(localStorage.getItem('cart')).forEach((cartItem) => {
        product = products.find(prod => prod.id == cartItem.id);
        detailedCartItemData.push({
            totalPrice: (parseFloat(product.price) * parseInt(cartItem.quantite)),
            quantity: cartItem.quantite,
            price: product.price,
            name: product.name,
            id: cartItem.id
        });
    });
}

// showCartContentOnly affiche le contenu du panier.

function showCartContentOnly(products){
    // on affiche la section avec le tableau html contenant les produits du panier
    
    toggleShownElement("#noItemDiv", "#cartContent");

    // on vide ce tableau

    let cartItemsElement = $("#cartItems");
    cartItemsElement.find("tr:gt(0)").remove();

    // création d'un tableau contenant les informations sur les produits dans le panier
    // les produits sont triés par ordre alphabétique

    let detailedCartItemsData = [];
    getDetailedCartItemsData(products, detailedCartItemsData);
    detailedCartItemsData.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

    // insertion du code html du tableau html affichant les produits dans le panier et calcul du prix total du panier

    let totalShoppingCartCost = 0; // prix total des produits dans le panier

    detailedCartItemsData.forEach((cartItem) => {
        // ajout du prix de chaque produit au prix total
        totalShoppingCartCost += cartItem.totalPrice;

        // ajout du code html dans le tableau pour chaque produit
        cartItemsElement.append(
            `<tr class="cartRow">
                <td 
                    class="cartFirstColumn 
                    cartRow"><i 
                    onclick="changeItemQuantityConfirm(products, 
                                                       ${cartItem.id}, 
                                                       -${cartItem.quantity}, 
                                                       this.id, 
                                                       'Voulez-vous vraiment supprimer ce produit?');" 
                    class="fa fa-circle-xmark fa-2x"></i></td>

                <td><a href="product.html?id=${cartItem.id}">${cartItem.name}</a></td>
                <td>${cartItem.price}</td>

                <td style="padding-left:5px;">
                    <i 
                        class="fa fa-circle-minus fa-1x" 
                        id="decrementQuantityButton${cartItem.id}" 
                        onclick="changeItemQuantity(products, ${cartItem.id}, -1, this.id);" 
                        style="padding:3px;"
                    ></i>
                    ${cartItem.quantity}
                    <i onclick="changeItemQuantity(products, 
                                                   ${cartItem.id}, 
                                                   1, 
                                                   this.id);" 
                       style="padding:3px;" 
                       class="fa fa-circle-plus 
                       fa-1x"></i>
                </td>

                <td class="cartFourthColumn">${parseFloat(cartItem.totalPrice).toFixed(2)}$</td>
            </tr>`
        );
    });

    // affichage du prix total calculé
    $("#cartTotalCost").html("Total: " + parseFloat(totalShoppingCartCost).toFixed(2) +"$");
}

function changeItemQuantity(products, itemId, quantityChange, id){
    let cart = JSON.parse(localStorage.getItem('cart'));  // tableau contenant le panier
    let decrementId = "decrementQuantityButton";          // préfixe d'id d'un bouton pour décrémenter la quantité d'un élément
    let cartItem = cart.find(p => p.id == itemId);        // produit dans le panier pour lequel on change la quantité

    if (id.includes(decrementId) && cartItem.quantite == 1) {
        $("#" + id).prop("disabled", true);
    } else {
        // on incrémente ou décrémente la quantité du produit

        cartItem.quantite = parseInt(cartItem.quantite) + quantityChange;

        // si la quantité du produit est 0, on le retire du tableau du panier

        if (cartItem.quantite == 0) {
            cart.splice(cart.indexOf(cartItem), 1);
        }

        // sauvegarde du panier, mise à jour du nombre total de produits affichés et ré-affichage du panier

        localStorage.cart = JSON.stringify(cart);
        updateCount(getQtProducts() + quantityChange);
        handleShoppingCartPage(products);
    }
}

// changeItemQuantityConfirm attend la confirmation de l'utilisateur avant de modifier la quantité d'un produit

function changeItemQuantityConfirm(products, itemId, quantityChange, id, message){
    if(confirm(message)) {
        changeItemQuantity(products, itemId, quantityChange, id);
    }
}

// $.ajax obtient la liste de produits à partir du fichier JSON
// la contenant, puis affiche le tableau des produits du panier

$.ajax({
    url: './data/products.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        products = data;
        handleShoppingCartPage(products);
    },
    error: (error) => {
        console.log(error);
    }
});