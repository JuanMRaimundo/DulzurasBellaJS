//constructores para manejar los ingresos que haga el usuario

class Tarta {
	constructor(sabor, precio, tamaño, stock) {
		this.sabor = sabor;
		this.precio = precio;
		this.tamaño = tamaño;
		this.stock = stock; //? o stockTarta?
	}
	venderTarta = (cant) => {
		//ver como darle funcionalidad para los stock de todos los productos
		if (cant <= stock) {
			this.stock = this.stock - cant;
		} else alert("La cantidad es mayor a la disponible");
	};
}
class Facturas {
	constructor(tipo, cantidad, stock) {
		this.tipo = tipo;
		this.cantidad = cantidad;
		this.stock = stock; //o stockFacturas?
	}
	venderFacturas = (cant) => {
		//ver como darle funcionalidad para los stock de todos los productos
		this.stock = this.stock - cant;
	};
}
const encargoTorta = [];
class Torta {
	constructor(bizcochuelo, relleno, cobertura, tamaño) {
		this.bizcochuelo = bizcochuelo;
		this.relleno = relleno;
		this.cobertura = cobertura;
		this.tamaño = tamaño;
	}
}
//empiezo a construir mi base de arrays de tartas, de a poco iré sumando otros productos.
const productos = [
	{
		tipo: "tarta",
		sabor: "Cabsha",
		precio: "1200",
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
	},
	{
		tipo: "tarta",
		sabor: "Frutillas",
		precio: "1500",
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
	},
	{
		tipo: "tarta",
		sabor: "Pastafrola",
		precio: "1100",
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
	},
	{
		tipo: "tarta",
		sabor: "AppleCrumble",
		precio: "1500",
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
	},
	{
		tipo: "tarta",
		sabor: "LemonPie",
		precio: "1300",
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
	},
	{
		tipo: "facturas",
		sabor: "medialunas",
		precio: "150",
	},
	{
		tipo: "facturas",
		sabor: "tortitas negras",
		precio: "120",
	},
	{
		tipo: "facturas",
		sabor: "sacramentos",
		precio: "170",
	},
];

let carritoCompra = []; //array para guardar la info q ingresa el usuario
//funcion q me permite ingresar los datos que quiere el usuario asi dsp aplicarlos en las otras funciones para armar el carrito

//constructor y funcion para encargar tortas a pedido. El límite será dos para poder evaluar cual se acepta. Ver si lo dejo como array o hago un constructor

let limite = 1;
const encargarTorta = function (arr, limite) {
	do {
		let bizcochuelo = prompt("Ingresa el sabor del bizcochuelo");
		let relleno = prompt("Ingresa el sabor del relleno");
		let cobertura = prompt("Ingresa el tipo de cobertura");
		let tamaño = prompt("Ingresa el tamaño del bizcochuelo");

		arr.push(new Torta(bizcochuelo, relleno, cobertura, tamaño));
	} while (arr.length != limite);
};
//ver lista de precios
/* const verPrecios = function (arr, fn) {
	for (const el of arr) {
		fn(el);
	}
};
verPrecios(precios, console.log); */
productos.forEach((el) => console.log(el.precio));

/* for (let i = 0; i < precios.length; i++) {
	console.log(precios[i]);
} */
/* for (const precioProd of Tarta) {
	console.log(precioProd.precio);
} */

//funcion para calcular envios
let copiaProductos = productos;
const precioConEnvio = copiaProductos.map((envio) => {
	return {
		sabor: envio.sabor,
		precio: Number(envio.precio * 1.1).toFixed(2),
	};
});
console.log(precioConEnvio);

//funcion  de busqueda
const busqueda = function (arr, filtro) {
	const encontrado = arr.find((el) => {
		return el.sabor.includes(filtro);
	});
	return encontrado;
};

const cargarTartas = function () {
	let sabor = prompt("Ingresá el sabor que has elegido");
	let precio = parseInt(prompt("Ingresá el precio del producto"));
	const nuevaTarta = new Tarta(sabor, precio);
	carritoCompra.push(nuevaTarta);
	alert("producto añadido al carrito");
};

const verCarrito = function () {
	carritoCompra.forEach((elemento) => {
		alert(
			`Ha seleccionado una tarta sabor ${elemento.sabor} que tiene un precio de $${elemento.precio}.`
		);
	});
};
const ofertaDelDia = function () {
	const ofertas = productos.filter((tarta) => tarta.precio < 1200);
	for (const oferta of ofertas) {
		alert(`La oferta del día de hoy es: ${oferta.sabor} a $${oferta.precio}`);
	}
};

const finalizarCompra = function () {
	const total = carritoCompra.reduce((acc, el) => acc + el.precio, 0);
	alert(`Su pedido tiene un total de $${total}`);
};

alert("Bienvenido/a a Dulzuras Bella");

let usuario = "Rodrigo";
let contraseña = 147741;
let ingreso = false;
let medialunas = 180;
let pastafrolas = 150;
let tortitasNegras = 130;

for (let i = 2; i >= 0; --i) {
	let ingresoUsuario = prompt(
		"Ingresá tu usario." + "Tenés " + (i + 1) + " oportunidades."
	);
	if (ingresoUsuario === usuario) {
		alert("Bienvenido Rodrigo! Comencemos con tu compra!");
		ingreso = true;
		break;
	} else {
		alert("ERROR");
	}
}

let opcion = prompt(
	"Ingrese una opción: \n 1:Añadir productos \n 2:Mostrar la oferta del día \n 3:Ver mi carrito \n 4:Finalizar compra \n 5: Salir"
);

while (opcion !== "5") {
	if (opcion === "1") {
		cargarTartas(carritoCompra);
	}
	if (opcion === "2") {
		ofertaDelDia();
	}
	if (opcion === "3") {
		verCarrito();
	}
	if (opcion === "4") {
		finalizarCompra();
	}
	opcion = prompt(
		"Vuelve a ingresar una opción \n 1:Seguir añadiendo productos \n 2:Mostrar la oferta del día \n 3:Ver mi carrito \n 4:Finalizar compra \n 5: Salir"
	);
}

encargarTorta(encargoTorta, limite);
console.log(encargoTorta);

alert("Gracias por compartir nuestras Dulzuras");

function evaluar(si, no) {
	let evaluacion = prompt("¿Volverías a pedir aquí?\n1-SI\n2-NO");
	switch (evaluacion) {
		case "1" || si:
			alert("Gracias por tu tiempo");
			break;
		case "2" || no:
			prompt("Ayudanos a mejorar con tu comentario");
			break;

		default:
			alert("Opción incorrecta");
			break;
	}
	return evaluar;
}
evaluar();

const inputSearch = document.querySelector(".form-control");

console.log(inputSearch.value);
inputSearch.addEventListener("keyup", () => {
	inputSearch.value;
});
const btnSearch = document.querySelector(".btn");

//asigno evento de busqueda
btnSearch.addEventListener("click", (e) => {
	e.preventDefault();
	const busq = busqueda(productos, inputSearch.value);
	console.log(busq);
});

const formulario = document.querySelector("#contacto");
formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	const inputUser = e.target[0];
	const inputConsulta = e.target[1];
	console.log(`User : ${inputUser.value} Consulta: ${inputConsulta.value}`);
});

// evento para Selectores

/* select.addEventListener("change", () => {
	let option = select.options[select.selectedIndex].value;
}); */

/* if (ingreso) {
let opciones = prompt(
	"Elegí tu producto para tu mesa dulce: \n1-Medialunas\n2-Pastafrolas\n3-Tortitas Negras\nX-Presiona x para terminar."
);

while (opciones != "x") {
	switch (opciones) {
		case "1":
			let pedido1 = parseInt(
				prompt("Ingresá tu dinero para abonar. Muchas gracias.")
			);
			if (pedido1 < 180) {
				alert("Ingresá un monto superior. Muchas gracias");
			} else {
				pedidoMedialuna = pedido1 - medialunas;

				alert(
					"Seleccionaste Medialunas, tiene un costo de $" +
						medialunas +
						".Tu vuelto es $" +
						pedidoMedialuna +
						"En 10min estará listo"
				);
			}

			break;
		case "2":
			let pedido2 = parseInt(
				prompt("Ingresá tu dinero para abonar. Muchas gracias.")
			);
			if (pedido2 < 150) {
				alert("Ingresá un monto superior. Muchas gracias");
			} else {
				pedidoPastafrola = pedido2 - pastafrolas;
				alert(
					"Seleccionaste Pastafrolas, tiene un costo de $" +
						pastafrolas +
						".Tu vuelto es $" +
						pedidoPastafrola +
						"En 10min estará listo"
				);
			}
			break;
		case "3":
			let pedido3 = parseInt(
				prompt("Ingresá tu dinero para abonar. Muchas gracias.")
			);
			if (pedido3 < 130) {
				alert("Ingresá un monto superior. Muchas gracias");
			} else {
				pedidoTortitasNegras = pedido3 - tortitasNegras;
				alert(
					"Seleccionaste Tortitas Negras, tiene un costo de $" +
						tortitasNegras +
						".Tu vuelto es $" +
						pedidoTortitasNegras +
						"En 10min estará listo"
				);
			}
			break;
		default:
			alert("Opción no válida");
			break;
	}

	opciones = prompt(
		"Si no pudiste elegir tu producto seleccionalo: \n1-Medialunas\n2-Pastafrolas\n3-Tortitas Negras\nSi ya elegiste presioná X, y tu pedido quedará registrado."
	);
}
} else {
alert("Registrate para que puedas armar tu presupuesto");
} */
