/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

$.validator.setDefaults({
  submitHandler: function(formControl) {
    let formData = $(formControl).serializeArray();
    var orderID = JSON.parse(localStorage.getItem('orderID'))
    
    if (orderID == null) {
      orderID = 1
    } else {
      orderID += 1
    }

    localStorage.setItem('orderID', orderID);
    localStorage.setItem('firstName', JSON.stringify(formData[0].value));
    localStorage.setItem('lastName', JSON.stringify(formData[2].value));

    formControl.submit()
  }
});

$().ready(function() {
    $("#formControl").validate({
        errorElement: 'div',
        errorClass: 'errorMessage',

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