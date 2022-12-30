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

var firstName = $.urlParam("firstname"); // prénom de l'utilisateur
var lastName = $.urlParam("lastname");   // nom de l'utilisateur

// numéro de confirmation
var orderID = JSON.parse(localStorage.getItem('orderID'));

// affichage du nom complet de l'utilisateur et du numéro de confirmation

$("#name").html(firstName + " " + lastName);
$("#orderID").html(orderID);