/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

let orderID = JSON.parse(localStorage.getItem('orderID'));
let firstName = JSON.parse(localStorage.getItem('firstName'));
let lastName  = JSON.parse(localStorage.getItem('lastName'));

$("#name").html(firstName + " " + lastName);
$("#orderID").html("<b>" + orderID + "</b>");