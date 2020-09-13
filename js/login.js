//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("iniciar").addEventListener("click", function (e) {
    let inputUser = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("inputPassword");
    let camposCompletos = true;

    if (inputUser.value === "") {
      inputUser.classList.add("invalid"); //esto es para que quede en rojo el campo
      camposCompletos = false;
    }

    if (inputPassword.value === "") {
      inputPassword.classList.add("invalid");
      camposCompletos = false;
    }

    if (camposCompletos) {
      localStorage.setItem(
        "usuario-logged",
        JSON.stringify({ username: inputEmail.value })
      );
      window.location = "cover.html";
    } else {
      alert("Tenés que ingresar tus datos");
    }
  });
});