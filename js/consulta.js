//funcion para guardar formulario
const formPresupuesto = document.getElementById("contacto"),
	inputMail = document.querySelector(".contacto_input"),
	textPresupuesto = document.querySelector(".consulta_text"),
	checkPresupuesto = document.querySelector(".form-check-input"),
	btnFormulario = document.querySelector("#pedido");

function guardarFormulario(valor) {
	const presupuesto = {
		usuario: inputMail.value,
		presupuestoUsua: textPresupuesto.value,
	};
	//valido si los campos están vacíos
	if (valor === "sessionStorage") {
		sessionStorage.setItem("presupuesto", JSON.stringify(presupuesto));
	}
	if (valor === "localStorage") {
		localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
	}
}
//evento para guardar formulario
btnFormulario.addEventListener("click", (e) => {
	e.preventDefault();
	if (checkPresupuesto.checked) {
		guardarFormulario("localStorage");
	} else {
		guardarFormulario("sessionStorage");
	}
});
