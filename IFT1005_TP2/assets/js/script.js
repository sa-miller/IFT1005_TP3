nbProduits = 0

count = $(".count")

if (nbProduits == 0) {
    count.hide()
} else {
    count.html(nbProduits)
}