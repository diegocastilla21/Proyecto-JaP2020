//Variables
var product = {};
var comentariosArray = [];

//Funcion que muestra el producto----------------------------------------------------------------
function showProductInfo(product, comentariosArray) {    
    
    let info = "";
    let imgs = "";
    let comments = "<hr>";

    info +=`
    
    <h3> ${product.name} </h3>
      <hr>
      <dl>
        <dd>
            <p> <strong> ${product.currency} ${product.cost} </strong><br><br>
        </dd>

        <dt> ${"Descripción"} </dt>
            <dd>
                <p> ${product.description} </p>
            </dd>

        <dt> ${"Cantidad de productos vendidos"} </dt>
            <dd>
                <p> ${product.soldCount} </p>
            </dd>

        <dt> ${"Categoria"} </dt>
            <dd>
                <p> ${product.category} </p><br><br>
            </dd>

        <dt> ${"Imágenes ilustrativas"} </dt>
            
    </dl>`
    

    comments += `<p><strong>${"Comentarios"}</strong></p></br>`;
    
    comentariosArray.forEach(function (comment) {
        
        comments += `<strong>${comment.user}</strong> dice:<br>
                    <p>${comment.description}</p>`;
        comments += `<sub>${comment.dateTime}</sub><br>`;
        comments += `<div style="text-align: right;">${comment.score}/5</div><br><hr>`;
    });

    document.getElementById("info").innerHTML = info;
    document.getElementById("comentarios").innerHTML = comments;
}

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let userLogged = localStorage.getItem("usuario-logged");
if (userLogged) {
    document.getElementById("nuevoCom").style = "display: inline-block";
}

document.getElementById("envCom").addEventListener("click", function () {
    let now = new Date();

    let dateTime = `${now.getFullYear()}-${
        now.getMonth() + 1
        }- ${now.getDate()} `;
    dateTime += `${now.getHours()}:${now.getMinutes()}: ${now.getSeconds()}`;

    let newComment = {
        //    score: parseInt(document.getElementById() ),
        description: document.getElementById("comment").value,
        user: JSON.parse(localStorage.getItem("usuario-logged")).user,
        dateTime: dateTime,
    };
    comentariosArray.push(newComment);
    showProductInfo(product, comentariosArray);
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showProductInfo(product, comentariosArray);
            showImagesGallery(product.images);
        }
    });
});
