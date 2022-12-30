/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

// ($.urlParam() provient de urlParam.js)

var firstName = $.urlParam("firstname"); // prénom de l'utilisateur
var lastName = $.urlParam("lastname");   // nom de l'utilisateur

// numéro de confirmation
var orderID = JSON.parse(localStorage.getItem('orderID'));

// affichage du nom complet de l'utilisateur et du numéro de confirmation

$("#name").html(firstName + " " + lastName);
$("#orderID").html(orderID);