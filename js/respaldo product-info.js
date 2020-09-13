var productArray = [];
var comentariosArray = [];

function showProduct(array, arrayComments) {


    let verProducto = JSON.parse(localStorage.getItem('product'));


    for (let i = 0; i < productArray.length; i++) {
        let product = array[i];
        let description = "";
        let cost = "";
        let currency = "";
        let soldCount = "";
        let category = "";
        let images = "";
        let relatedProducts = "";
        let comments = "<hr>";

        if (product.name == verProduct.productName) {
            info += '<h2>' + product.titulo + '</h2>';
            info += '<strong>' + product.autor + '</strong><br><br>';
            info += '' + product.editorial + '<br>';
            info += product.isbn + '<br>';
            info += product.paginas + ' págs.<br>';

            imgs += '<img class="img" src="img/' + product.name + 'img/prod1.jpg" width="100px" height="150px" alt="">';
            imgs += '<img class="img" src="img/' + product.name + 'img/prod1_1.jpg" width="100px" height="150px" alt="">';
            imgs += '<img class="img" src="img/' + product.name + 'img/prod1_2.jpg" width="100px" height="150px" alt="">';
            imgs += '<img class="img" src="img/' + product.name + 'img/prod1_3.jpg" width="100px" height="150px" alt="">';
            imgs += '<img class="img" src="img/' + product.name + 'img/prod1_4.jpg" width="100px" height="150px" alt="">';

            for (let comment in arrayComments) {

                if (arrayComments[comment].id_libro == verLibro.libroId) {
                    comments += '<strong>' + arrayComments[comment].usuario + '</strong> dice:<br>';
                    comments += '<p>' + arrayComments[comment].comentario + '</p><br>';
                    comments += 'Calificación: <strong>' + arrayComments[comment].calificacion + '</strong> dice:<br>';
                    comments += '<br><hr>'
                }
            }

            document.getElementById("contenido").innerHTML = info;
            document.getElementById("imagenes").innerHTML = imgs;
            document.getElementById("comentarios").innerHTML = comments;
        }
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }

    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;

            showProduct(librosArray, comentariosArray);
        }
    })

});
