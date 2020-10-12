var productsArray = [];

function precioTotal(){
  let total = 0;
  let subs = document.getElementsByClassName("subtotal");
  for (let i = 0; i < subs.length; i++){
    total += parseInt(subs[i].innerHTML);

  }

  document.getElementById("preTotal").innerHTML = total;

}

function calcSubtotal (unitCost, i){
  let count = parseInt(document.getElementById(`cantidad${i}`).value);
  subtot = unitCost * count;
  document.getElementById(`productsSubtotal${i}`).innerHTML = subtot;

  precioTotal();

}

function showCartInfo(array) {

  let contenido = "";

  for (let i = 0; i < array.length; i++) {

    let articles = array[i];

    let cotiDolar = 40;

    let preDol = articles.unitCost;

    if (articles.currency == "UYU")
    preDol = articles.unitCost / cotiDolar;

    let subPre = articles.count * preDol;  
    
    contenido += `
    <tr>
        <td><img src='${articles.src}' width="200px"></td>

        <td>${articles.name}</td>

        <td class="text-right">${preDol}</td>

        <td><input style="width:60px;" onchange="calcSubtotal( ${preDol}, ${i} )"
            type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>
        
        <td><span class="subtotal" id="productsSubtotal${i}" style="font-weight:bold;">${subPre}</span></td>
    </tr>
    `;   
  
    document.getElementById("listado").innerHTML = contenido;

  }

  precioTotal();

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  getJSONData(CART_INFO_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        productsArray = resultObj.data.articles;
  
        showCartInfo(productsArray);

        precioTotal();

      }

  }); 

});