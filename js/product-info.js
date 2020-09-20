//Variables
var product = {};
var comentariosArray = [];
var productsArray = [];

//Funcion para mostrar productos relacionados----------------------------------------------------
function showRelatedProducts(arrayProducts, arrayRelacionados) {
    
    let contenido = "<hr>";

    arrayRelacionados.forEach(function (i) {
    
    contenido += `<div class="card mr-3 h-10 w-25">
            <a href="#" class=" custom-card">
                <img class="bd-placeholder-img card-img-top" src="${arrayProducts[i].imgSrc}">
                <h3 class="m-3">${arrayProducts[i].name}</h3>
                <div class="card-body">
                    <p class="card-text">${arrayProducts[i].description}</p>
                </div>
            </a>
        </div>
        `;
  });

  document.getElementById("prodRelacionados").innerHTML = contenido;
}

//Funcion que muestra el producto----------------------------------------------------------------
function showProductInfo(product, comentariosArray) {
  let info = "";
  let comments = "<hr>";

  info += `

    <img class="bd-placeholder-img card-img-top" width="50%" height="50%" src="${product.images[0]}">

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

        <dt> <h4><strong>Imágenes ilustrativas</strong></h4> </dt>            
    </dl>`;

  comments += `<p><strong>${"Comentarios:"}</strong></p></br>`;

  comentariosArray.forEach(function (comment) {

    comments += `<strong>${comment.user}</strong> dice:<br>
                 <p>${comment.description}</p>
                 <sub>${comment.dateTime}</sub><br>
                 <div style="text-align: right;">${comment.score}/5</div><br><hr>`;
});

  document.getElementById("info").innerHTML = info;
  document.getElementById("comentarios").innerHTML = comments;
}

//Funcion para mostrar la galeria de imagenes
function showImagesGallery(array) {
  let htmlContentToAppend = "";

  htmlContentToAppend += `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="${array[0]}" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${array[1]}" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${array[2]}" alt="Third slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${array[3]}" alt="Third slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${array[4]}" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div><br><br><br><hr>`;

    htmlContentToAppend += `<h3><strong>Otros productos que pueden interesarte:</strong></h3>`

  document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

//Enviar comentarios
let userLogged = localStorage.getItem("usuario-logged");
if (userLogged) {
  document.getElementById("nuevoCom").style = "display: inline-block";
}

document
  .getElementById("enviarComentario")
  .addEventListener("click", function () {
    let now = new Date();

    let dateTime = `${now.getFullYear()}-${
      now.getMonth() + 1
    }- ${now.getDate()} `;
    dateTime += `${now.getHours()}:${now.getMinutes()}: ${now.getSeconds()}`;

    let newComment = {
      score: parseInt(estrellas()),
      description: document.getElementById("comment").value,
      user: JSON.parse(localStorage.getItem("usuario-logged")).username,
      dateTime: dateTime,
    };
    comentariosArray.push(newComment);
    showProductInfo(product, comentariosArray);
  });

//Funcion estrellas para comentar
function estrellas() {
  let stars = document.getElementsByName("rating");
  for (let i = 0; i <= stars.length; i++) {
    if (stars[i].checked) {
      return stars[i].value;
    }
  }
}

//Mostrar info del articulo, imagenes, comentarios y productos relacionados
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

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;

      showRelatedProducts(productsArray, product.relatedProducts);
    }
  });
});
