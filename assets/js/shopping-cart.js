/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

function handleShoppingCartPage(products){
    if (localStorage.panier) {
        showCartContentOnly(products);
    } else showNoItemDivOnly();
}

function showNoItemDivOnly(){
    $("div#cartContent").hide();
    $("div#noItemDiv").show();
}

function viderPanier(products){
    if(confirm("Voulez-vous supprimer tous les produits du panier?")){
        localStorage.removeItem("panier");
        miseAJourCount(0);
        handleShoppingCartPage(products);
    }
}

function showCartContentOnly(products){
    $("div#noItemDiv").hide();
    $("div#cartContent").show();

    //on clear la section html qui contient les items du panier 
    cartItemsElement = $("#cartItems");
    cartItemsElement.find("tr:gt(0)").remove();

    //on creer un tableau qui va contenir plus d'information sur les items du panier et les sort
    detailedCartItemsData = [];
    getDetailedCartItemsData(products, detailedCartItemsData);
    detailedCartItemsData.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

    //ici on genere le code html du tableau detaille d'item creer en haut et calcule la prix total du panier
    totalShoppingCartCost = 0; 
    detailedCartItemsData.forEach((cartItem) => {
        totalShoppingCartCost += cartItem.totalPrice;
        cartItemsElement.append(
            `<tr class="cartRow">
                <td class="cartFirstColumn cartRow"><i onclick="removeCartItem(products, ${cartItem.id});" class="fa fa-circle-xmark fa-2x"></i></td>
                <td><a href="product.html">${cartItem.name}</a></td>
                <td>${cartItem.price}</td>
                <td style="padding-left:5px;">
                    <i id="decrementQuantityButton${cartItem.id}"onclick="changeItemQuantity(products, ${cartItem.id} , -1);" style="padding:3px;"class="fa fa-circle-minus fa-1x"></i>
                    ${cartItem.quantity}
                    <i onclick="changeItemQuantity(products, ${cartItem.id} , 1);" style="padding:3px;" class="fa fa-circle-plus fa-1x"></i></td>
                <td class="cartFourthColumn">${parseFloat(cartItem.totalPrice).toFixed(2)}$</td>
            </tr>`
        );
    });

    //on set le label qui contient le prix du panier au prix calcule juste en haut
    $("#cartTotalCost").html("Total: " + parseFloat(totalShoppingCartCost).toFixed(2) +"$");
}

function removeCartItem(products, itemId){
    //si l'utilisateur n'importe quel touche que ok on la suppresion de l'item du panier
    if(!confirm("Voulez voulez vraiment supprimer cet item ?"))
        return;

    cart =  JSON.parse(localStorage.getItem('panier'));
    updatedCart = cart.filter(item => item.id != itemId);

    //si tout les items ont etait enleve on detruit la propriete panier vu qu'elle nest plus utiliser
    if(updatedCart.length == 0) localStorage.removeItem('panier');
    //sinon si il reste des items des items de le filtered cart on les remet dans le local storage
    else localStorage.panier = JSON.stringify(updatedCart);

    //mise a jour du nombre ditem dans le panier de la bar de navigation
    miseAJourCount(updatedCart.length);
    //reaffiche le content avec les les donnes du panier updated
    handleShoppingCartPage(products);
}

function changeItemQuantity(products, itemId, quantityChange){
    cart = JSON.parse(localStorage.getItem('panier'));
    //si l'utilisateur essaye d'enlever la une unite de quantite quand elle deja a 1, on disable le bouton "-""
    if(quantityChange == -1 && cart.find(p => p.id == itemId).quantite == 1){

        $("#decrementQuantityButton" + itemId).prop("disabled", true);
        return;
    }
    //on cherche l'item dont on veut changer la quantity et on applique l'increment (+1 ou 1)
    cart.forEach(x => {  if (x.id == itemId)  x.quantite = parseInt(x.quantite) + quantityChange; });
    localStorage.panier = JSON.stringify(cart);
    miseAJourCount(getQtProduits() + quantityChange);
    handleShoppingCartPage(products);
}

function getDetailedCartItemsData(products, detailedCartItemData){
    JSON.parse(localStorage.getItem('panier')).forEach((cartItem) => {
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