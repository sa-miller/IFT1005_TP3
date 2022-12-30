/**
* 
* @author Samuel Miller
* @author Malik Abada
* @author Joseph Finan 
*
*/

// $.urlParam obtient les informations de la page précédente spécifiées dans l'URL (méthode get)

$.urlParam = function(name){
    // préfixes et correspondance regex
    var prefixes = '&\?'
    var resultat = new RegExp('[' + prefixes + ']' + name + '=([^' + prefixes + ']*)').exec(window.location.href);

    // retour du résultat
    if (resultat == null) {
        return null;
    } else {
        return resultat[1] || 0;
    }
}