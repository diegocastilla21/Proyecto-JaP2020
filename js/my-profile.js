document.addEventListener("DOMContentLoaded", function (e) {

  let perfil = localStorage.getItem("perfil");

  if (perfil) {
    perfil = JSON.parse(perfil);

    if (perfil.imgUrl != "") {

      document.getElementById("imgPerfil").src = perfil.imgUrl;
    }

    document.getElementById("imgUrl").value = perfil.imgUrl;
    document.getElementById("nombreUsuario").value = perfil.nombres;
    document.getElementById("apellidoUsuario").value = perfil.apellidos;
    document.getElementById("edadUsuario").value = perfil.edad;
    document.getElementById("emailUsuario").value = perfil.email;
    document.getElementById("telUsuario").value = perfil.telefono;
  }

  document
    .getElementById("btnGuardarDatos").addEventListener("click", function (e) {
      let passedValidation = true;
      let imgUrl = document.getElementById("imgUrl");
      let nombres = document.getElementById("nombreUsuario");
      let apellidos = document.getElementById("apellidoUsuario");
      let edad = document.getElementById("edadUsuario");
      let email = document.getElementById("emailUsuario");
      let telefono = document.getElementById("telUsuario");

      if (nombres.value === "") {
        nombres.classList.add("is-invalid");
        passedValidation = false;
      } else {
        nombres.classList.remove("is-invalid");
      }

      if (apellidos.value === "") {
        apellidos.classList.add("is-invalid");
        passedValidation = false;
      } else {
        apellidos.classList.remove("is-invalid");
      }

      if (email.value === "") {
        email.classList.add("is-invalid");
        passedValidation = false;
      } else {
        email.classList.remove("is-invalid");
      }

      if (passedValidation) {
        localStorage.setItem("perfil", JSON.stringify({

            nombres: nombres.value,
            apellidos: apellidos.value,
            edad: edad.value,
            imgUrl: imgUrl.value,
            email: email.value,
            telefono: telefono.value,

          })

        );

        window.location = "my-profile.html";

      }

    });

});
