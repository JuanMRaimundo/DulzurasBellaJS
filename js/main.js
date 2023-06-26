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
const cobertura = ["Salta", "San Lorenzo", "Tres Cerritos", "San Luis"];
//empiezo a construir mi base de arrays de tartas, de a poco iré sumando otros productos.
/* const productos = [
	{
		id: 1,
		tipo: "tarta",
		sabor: "Cabsha",
		precio: "1200",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/cabsha.jpg",
	},
	{
		id: 2,
		tipo: "tarta",
		sabor: "Frutillas",
		precio: "1500",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/frutilla1.jpg",
	},
	{
		id: 3,
		tipo: "tarta",
		sabor: "Pastafrola",
		precio: "1100",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/pastafrola1.jpg",
	},
	{
		id: 4,
		tipo: "tarta",
		sabor: "AppleCrumble",
		precio: "1500",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/manzana1.jpg",
	},
	{
		id: 5,
		tipo: "tarta",
		sabor: "LemonPie",
		precio: "1300",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/lemonpie1.jpg",
	},
	{
		id: 6,
		tipo: "tarta",
		sabor: "Brownie",
		precio: "1500",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/brownie1.jpg",
	},
	{
		id: 7,
		tipo: "tarta",
		sabor: "Ricota con dulce de leche",
		precio: "1750",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/ricota1.jpg",
	},
	{
		id: 8,
		tipo: "tarta",
		sabor: "Cheesecake",
		precio: "1900",
		cantidad: 0,
		tamañoGrande: "28cm diametro",
		tamañoChico: "10cm diametro",
		imagen: "./img/cheesecake.jpg",
	},
	{
		id: 9,
		tipo: "facturas",
		sabor: "Medialunas",
		precio: "150",
		cantidad: 0,
		imagen: "./img/medialuna1.jpg",
	},
	{
		id: 10,
		tipo: "facturas",
		sabor: "Cañioncitos",
		precio: "180",
		cantidad: 0,
		imagen: "./img/canioncito.jpg",
	},
	{
		id: 11,
		tipo: "facturas",
		sabor: "Conitos",
		precio: "180",
		cantidad: 0,
		imagen: "./img/conitos.jpg",
	},
	{
		id: 12,
		tipo: "facturas",
		sabor: "Chipa",
		precio: "220",
		cantidad: 0,
		imagen: "./img/chipa.jpg",
	},
];
 */
let carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];
let viendoCarrito = document.getElementById("cart");
let agregarTotal = document.getElementById("total");
let finalizarCompra = document.querySelector(".finalizar");
const inputSearch = document.querySelector(".form-control");
const contenedor = document.getElementById("container");
const zonas = document.getElementById("zonas");
const btnSearch = document.querySelector(".btn");

//array para trabajar desde el LS
const productosLS = JSON.parse(localStorage.getItem("productos"));
/* const productosLS = []; */

//funcion guardar productos en el LS
function guardarEnLS(clave, arr) {
	localStorage.setItem(clave, JSON.stringify(arr));
}
guardarEnLS("productos", productos);

let carritoLS = JSON.parse(localStorage.getItem(productosLS)) || productosLS;

//evento en el input

inputSearch.addEventListener("keyup", () => {
	inputSearch.value;
});

//asigno evento de busqueda
btnSearch.addEventListener("click", (e) => {
	e.preventDefault();
	const busq = busqueda(productos, inputSearch.value);
	console.log(busq);
});

localStorage.getItem("productos")
	? (dulzuras = JSON.parse(localStorage.getItem("productos")))
	: (carritoCompra = productos);

//funcion de busqueda
function filtrar(arr, filtro, param) {
	return arr.filter((el) => {
		if (param == "precio") {
			return el.precio <= parseFloat(filtro);
		} else {
			return el[`${param}`].includes(filtro);
		}
	});
}
// funcion para dibujar el html
const dibujarProductos = (productos) => {
	contenedor.innerHTML = "";
	productos.forEach((producto) => {
		let card = document.createElement("div");
		card.classList.add("card", "col.sm-12", "col-lg-3");
		let contenido = `  <img src="${producto.imagen}" class="card-img-top" alt="...">
		<div class="card-body">
		  <h5 class="card-title">${producto.sabor}</h5>
		  <p class="card-text">$${producto.precio}</p>
		  <button  class="btn btn-bs-warning-bg-subtle agregar-btn" >Agregar Dulzura</button>
		</div>`;
		// Agrego la card al contenedor
		card.innerHTML = contenido;
		contenedor.appendChild(card);
		// Ahora la card está en el DOM. El botón ya existe, por lo tanto lo capturo
		const botones = document.querySelectorAll(".agregar-btn");
		// Agrego evento al botón capturado.
		botones.forEach((boton, index) => {
			// Si hacemos clic en el botón, se agrega al carrito
			boton.addEventListener("click", () => {
				aniadirCarrito(productos[index].id);
			});
		});
	});
};

let totalCarrito = carritoCompra.reduce(
	(acc, el) => acc + el.precio * el.cantidad,
	0
);

//funcion  de filtro
const busqueda = function (arr, filtro) {
	const encontrado = arr.filter((el) => {
		return el.sabor.includes(filtro);
	});
	dibujarProductos(encontrado);
};
// funcion para añadir productos al carrito
let aniadirCarrito = (id) => {
	const producto = productosLS.find((el) => el.id == id); //arreglar para q me acepte mas de uno y se vayan sumando
	const productoExistente = carritoCompra.find((el) => el.id === producto.id);

	if (productoExistente) {
		// Si el producto ya existe, incrementar su cantidad
		productoExistente.cantidad++;
	} else {
		// Si es un nuevo producto, añadirlo al carrito con cantidad 1
		producto.cantidad = 1;
		carritoCompra.push(producto);
	}

	guardarEnLS("carrito", carritoCompra);
	renderizarCarrito();
};

//funcion para dibujar y actualizar carrito
let renderizarCarrito = () => {
	viendoCarrito.className = "card-carrito";
	viendoCarrito.innerHTML = "";
	const contenedorCarrito = document.createElement("div");
	contenedorCarrito.classList.add("contenedorCarrito");
	/* 	if (carritoCompra.length === 0) {
		viendoCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
		agregarTotal.innerHTML = "";
		finalizarCompra.classList.add("d-none");
		return;
	} */

	carritoCompra.forEach((item, index) => {
		const li = document.createElement("li");
		li.innerHTML = `
		  <ul>
			<img class="carrComp" src="${item.imagen}"/> 
			<li class="productoEnCarrito">${item.sabor}</li>
			<li class="productoEnCarrito">Cantidad: ${item.cantidad}</li>
			<li class="productoEnCarrito">Precio: ${item.precio}</li>
			<li class="productoEnCarrito">Subtotal: ${item.precio * item.cantidad}</li>
			<button class="btn btn-bs-warning-bg-subtle removerProducto" data-index="${index}">Quitar Dulzura</button>
		  </ul>
		`;

		const botonRemover = li.querySelector(".removerProducto");
		botonRemover.addEventListener("click", (e) => {
			const productIndex = e.target.dataset.index;
			removerProducto(productIndex);
		});

		contenedorCarrito.appendChild(li);
	});

	let totalCarrito = carritoCompra.reduce(
		(acc, el) => acc + el.precio * el.cantidad,
		0
	);

	agregarTotal.innerHTML = `
		<div class="carrTot"> Total: $${totalCarrito}</div>
		<button class="btn finaliza">Finalizar compra</button>
	  `;
	const final = document.querySelector(".finaliza");
	final.addEventListener("click", () => {
		finalizando();
	});

	viendoCarrito.appendChild(contenedorCarrito);
};

const removerProducto = (index) => {
	carritoCompra.splice(index, 1);
	// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página
	guardarEnLS("carrito", carritoCompra);
	renderizarCarrito();
};

//guardar carrito en LS y finalizar compra

async function finalizando() {
	const { value: formValues } = await Swal.fire({
		title: "Finalizá tu compra",
		html: `<form class="row g-3">
			<div class="col-md-6">
			  <label for="inputEmail4" class="form-label">Email</label>
			  <input type="email" class="form-control" id="inputEmail4">
			</div>
			<div class="col-md-6">
			  <label for="inputPassword4" class="form-label">Contraseña</label>
			  <input type="password" class="form-control" id="inputPassword4">
			</div>
			<div class="col-12">
			  <label for="inputAddress" class="form-label">Dirección</label>
			  <input type="text" class="form-control" id="inputAddress" placeholder="Calle - N°-">
			</div>
			<div class="col-md-6">
			  <label for="inputCity" class="form-label">Ciudad</label>
			  <input type="text" class="form-control" id="inputCity">
			</div>
			<div class="col-md-4">
			  <label for="inputState" class="form-label">Forma de pago</label>
			  <select id="inputState" class="form-select">
				<option selected>Elige...</option>
				<option>Efectivo</option>
				<option>Mercado Pago</option>
			  </select>
			</div>
			<div class="col-md-2">
			  <label for="inputZip" class="form-label">N° Dpto</label>
			  <input type="text" class="form-control" id="inputZip">
			</div>

			<div class="col-12">
			<button type="submit" class="btn btn-primary">Cancelar</button>
		  </div>
		  </form>,`,

		showCloseButton: true,
		focusConfirm: false,
		showCancelButton: false,
	});

	if (formValues) {
		setTimeout(() => {
			Swal.fire("Gracias por tu compra").then(() => {
				carritoCompra.splice(0); //borro datos del array carrito
				localStorage.removeItem("carrito"); //borro el carrito
				location.reload(); // Recargar la página
			});
		}, 1000);
	}
}

// desestructura cobertura

const zonaCobertura = [...cobertura];
console.log(zonaCobertura);
//pintar zonas en FT

let encontranos = () => {
	zonas.innerHTML = `<div>Encontranos en ${zonaCobertura}</div>`;
};
encontranos();
dibujarProductos(productos);
renderizarCarrito();

fetch("./data/db.json")
	.then((response) => response.json())
	.then((data) => {
		dibujarProductos(data.productos);
		renderizarCarrito();
	});
/* fetch("./data/db.json")
	.then((response) => response.json())
	.then((data) => {
		// Obtener los productos del objeto data
		const productos = data.productos;

		// Guardar los productos en el Local Storage
		guardarEnLS("productos2", productos);

		// Llamar a la función para dibujar los productos en el navegador

		dibujarProductos(productos);
	})
	.catch((error) => {
		console.log("Error al obtener los datos:", error);
	});
 */
