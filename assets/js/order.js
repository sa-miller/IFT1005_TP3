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

// $.validator.setDefaults définit les paramètres du validateur

$.validator.setDefaults({
  // submitHandler définit les paramètres pour soumission du formulaire

  submitHandler: function(orderForm) {
    // incrémentation et enregistrement du orderID

    let orderID = JSON.parse(localStorage.getItem('orderID'))

    if (orderID == null) {
      orderID = 1;
    } else {
      orderID += 1;
    }

    localStorage.setItem('orderID', orderID);
    orderForm.submit(); // soumission du formulaire
  }
});

// code appelé lors du chargement de la page

$().ready(function() {
    // validate définit les paramètres pour validation du formulaire

    $("#orderForm").validate({
        errorElement: 'div',        // balise d'élément contenant les messages d'erreurs
        errorClass: 'errorMessage', // classe de cet élément

        // règles de validation
        rules: {
            firstname: {
              required: true, 
              minlength:2
            },
            lastname: {
              required: true, 
              minlength:2
            },

            email: {
              required: true,
              email: true
            },

            phone: {
              required: true,
              phoneUS: true
            },

            creditcard: {
              required: true,
              creditcard: true
            },

            creditcardexpiry: {
              required: true,
              pattern: /^((0[1-9])|(1[0-2]))\/\d{2}$/
            }
        }
    })
})