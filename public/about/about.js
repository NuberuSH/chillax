const botonesVerMas = document.querySelectorAll(".ver-mas");
const textosAdicionales = document.querySelectorAll(".texto-adicional");

botonesVerMas.forEach((botonVerMas, index) => {
  botonVerMas.addEventListener("click", function () {
    if (textosAdicionales[index].classList.contains("oculto")) {
      textosAdicionales[index].classList.remove("oculto");
    } else {
      textosAdicionales[index].classList.add("oculto");
    }
  });
});
