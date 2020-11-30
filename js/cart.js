var productsArray = [];
let PERCENTAGE_SYMBOL = "%";
let porcentajeEnvio = 0.15;

//Funcion para el calculo del precio de todos los articulos en el carrito
function precioTotal() {
  let total = 0;
  let subs = document.getElementsByClassName("subtotal");
  for (let i = 0; i < subs.length; i++) {
    total += parseInt(subs[i].innerHTML);
  }

  document.getElementById("preTotal").innerHTML = total;
  updateTotalCosts();
}

//Funcion para calcular el precio por cada articulo segun su cantidad
function calcSubtotal(unitCost, i) {
  let count = parseInt(document.getElementById(`cantidad${i}`).value);
  subtot = unitCost * count;
  document.getElementById(`productsSubtotal${i}`).innerHTML = subtot;

  precioTotal();
}

//Funcion para mostrar articulos en el carrito de compras
function showProductsCart(array) {
  let contenido = "";

  for (let i = 0; i < array.length; i++) {
    let articles = array[i];

    let cotiDolar = 40;

    let preDol = articles.unitCost;

    if (articles.currency == "UYU") preDol = articles.unitCost / cotiDolar;

    let subPre = articles.count * preDol;

    contenido += `
    <tr>
        <td><img src='${articles.src}' width="200px"></td>

        <td>${articles.name}</td>

        <td class="text-right">${articles.unitCost}</td>

        <td>${articles.currency}</td>

        <td><input style="width:60px;" onchange="calcSubtotal( ${preDol}, ${i} )"
            type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>
        
        <td><span class="subtotal" id="productsSubtotal${i}" style="font-weight:bold;">${subPre}</span></td>
    </tr><br><br>
    `;

    document.getElementById("listado").innerHTML = contenido;
  }

  precioTotal();
}

//Funcion para mostrar las opciones de pago segun que metodo se elija
function selecPago() {
  let pagos = document.getElementsByName("datosPago");

  for (let i = 0; i < pagos.length; i++) {
    if (pagos[i].checked && pagos[i].value == "1") {
      document.getElementById("infoTarjCredi").classList.remove("d-none");
      document.getElementById("infoCuentaBanc").classList.add("d-none");
    } else if (pagos[i].checked && pagos[i].value == "2") {
      document.getElementById("infoTarjCredi").classList.add("d-none");
      document.getElementById("infoCuentaBanc").classList.remove("d-none");
    }
  }
}

//Funcion para validar el pago si estan los campos COMPLETOS
function pagoValido() {
  let numTarjeta = document.getElementById("numTrj").value;
  let titularTarjeta = document.getElementById("titularTrj").value;
  let cvvTarj = document.getElementById("cvvTrj").value;

  let cuenta = document.getElementById("numCuenta").value;

  let formaPago = document.getElementsByName("datosPago");
  let pagoValidado = true;

  for (var i = 0; i < formaPago.length; i++) {
    if (formaPago[i].checked && (formaPago[i].value) == "1") {
      if (numTarjeta == "" || titularTarjeta == "" || cvvTarj == "") {
        pagoValidado = false;
      } else {
        pagoValidado = true;
      }
    } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
      if (cuenta == "") {        
      pagoValidado = false;
    } else {
      pagoValidado = true;
    }
  }
  return pagoValidado;
}}

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {
  let productCost = parseInt(document.getElementById("preTotal").innerHTML);
  let costEnviPre = parseInt(document.getElementById("precioEnvio").innerHTML);
  let porceEnvi = parseInt(document.getElementById("porcentajeEnvio").innerHTML);
  let totalCost = parseInt(document.getElementById("totalCosto").innerHTML);

  let porcenEnvio = porcentajeEnvio * 100 + PERCENTAGE_SYMBOL;
  let costoEnvi = productCost * porcentajeEnvio;
  let totalMasEnvio = productCost + costoEnvi;

  porceEnvi.innerHTML = porcenEnvio;
  costEnviPre.innerHTML = costoEnvi;
  totalCost.innerHTML = totalMasEnvio;

  document.getElementById("porcentajeEnvio").innerHTML = porcenEnvio;
  document.getElementById("precioEnvio").innerHTML = costoEnvi;
  document.getElementById("totalCosto").innerHTML = totalMasEnvio;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.articles;

      showProductsCart(productsArray);

      precioTotal();

      updateTotalCosts();

      pagoValido();
    }
  });

  let tiposPagos = document.getElementsByName("datosPago");

  for (let i = 0; i < tiposPagos.length; i++) {
    tiposPagos[i].addEventListener("change", function (e) {
      selecPago();
    });

    document.getElementById("premium").addEventListener("change", function () {
      porcentajeEnvio = 0.15;

      updateTotalCosts();
    });

    document.getElementById("express").addEventListener("change", function () {
      porcentajeEnvio = 0.07;

      updateTotalCosts();
    });

    document.getElementById("standard").addEventListener("change", function () {
      porcentajeEnvio = 0.05;

      updateTotalCosts();
    });
  }

  let form = document.getElementById('formAfueraDireccion');

  form.addEventListener('submit', function (e) {

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      if (pagoValido()) {
        document.getElementById("confirmDatosComp").classList.remove("btn-success");
        document.getElementById("confirmDatosComp").classList.remove("btn-danger");
        document.getElementById("confirmDatosComp").classList.add("btn-success");
        document.getElementById("pagar").innerHTML = `
        <br>
        <div class="alert alert-success alert-dismissible show" role="alert">
            <strong>Forma de pago ingresada</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
      } else {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("confirmDatosComp").classList.remove("btn-success");
        document.getElementById("confirmDatosComp").classList.remove("btn-primary");
        document.getElementById("confirmDatosComp").classList.add("btn-danger");
        document.getElementById("pagar").innerHTML = `
                <br>
                <div class="alert alert-danger alert-dismissible show" role="alert">
                    <strong>Debe ingresar una forma de pago!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
      }
    }
  });
});
