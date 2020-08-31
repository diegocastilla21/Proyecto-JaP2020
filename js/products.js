//Constantes
const ORDER_ASC_BY_COST = "cost->COST";
const ORDER_DESC_BY_COST = "COST->cost";
const ORDER_DESC_BY_RELEVANCIA = "RELEVANCIA->relevancia";

//Variable
var productsArray = [];
//Variable para filtrado por precio
var minPre = undefined;
var maxPre = undefined;

//Funcion orden----------------------------------------------------------------------------
function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

    } else if (criterio === ORDER_DESC_BY_RELEVANCIA) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}


//Funcion listado productos----------------------------------------------------------------
function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minPre == undefined) || (minPre != undefined && parseInt(product.cost) >= minPre)) &&
            ((maxPre == undefined) || (maxPre != undefined && parseInt(product.cost) <= maxPre))) {

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + " - " + product.currency + " " + product.cost + `</h4>
                        <small class="text-muted">` + product.soldCount + `  vendidos</small>                      
                        </div>
                    <p>` + product.description + `</p>                    
                </div>
            </div>
        </div>
        ` ;
            }
            document.getElementById("listaProductos").innerHTML = htmlContentToAppend;
        }
    }


    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.

    document.addEventListener("DOMContentLoaded", function (e) {

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;

                //----------------------------------------------------
                //Muestra por defecto ordenado por precios ascendentes
                productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);
                //----------------------------------------------------

                showProductsList(productsArray);
            }
        });


        // Funcionalidades de orden ascendente y descendente en función del precio y descendente en función de la relevancia
        document.getElementById("costAsc").addEventListener("click", function (e) {
            //Ordena por costo ascendente
            productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);

            //Muestra los prductos ordenados
            showProductsList(productsArray);
        });

        document.getElementById("costDesc").addEventListener("click", function () {
            //Ordena por costo descendente
            productsArray = sortProducts(ORDER_DESC_BY_COST, productsArray);

            //Muestra los productos ordenados
            showProductsList(productsArray);
        });

        document.getElementById("relevanciaDesdendente").addEventListener("click", function () {
            //Ordena por relevancia descendente
            productsArray = sortProducts(ORDER_DESC_BY_RELEVANCIA, productsArray);

            //Muestra los productos ordenados
            showProductsList(productsArray);
        });


        // Filtros a partir de rango de precio definido
        document.getElementById("ir").addEventListener("click", function () {


            minPre = document.getElementById("precio-min").value;
            maxPre = document.getElementById("precio-max").value;

            if ((minPre != undefined) && (minPre != "") && (parseInt(minPre)) >= 0) {
                minPre = parseInt(minPre);
            }
            else {
                minPre = undefined;
            }

            if ((maxPre != undefined) && (maxPre != "") && (parseInt(maxPre)) >= 0) {
                maxPre = parseInt(maxPre);
            }
            else {
                maxPre = undefined;
            }

            showProductsList(productsArray);
        });
    });