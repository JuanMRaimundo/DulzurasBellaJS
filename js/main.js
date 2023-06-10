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
		tipo: "facturas",
		sabor: "medialunas",
		precio: "150",
		cantidad: 0,
		imagen: "./img/medialuna1.jpg",
	},
	{
		id: 8,
		tipo: "facturas",
		sabor: "tortitas negras",
		precio: "120",
		cantidad: 0,
		imagen: "./img/tortita-negra1.jpg",
	},
	{
		id: 9,
		tipo: "facturas",
		sabor: "sacramentos",
		precio: "180",
		cantidad: 0,
		imagen: "./img/sacramento1.jpg",
	},
];

//guardar productos en el LS

function guardarEnLS(arr) {
	localStorage.setItem("productos", JSON.stringify(arr));
}
guardarEnLS(productos);

let carritoCompra = []; //array para guardar la info q ingresa el usuario

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

//funcion  de filtro
const busqueda = function (arr, filtro) {
	const encontrado = arr.find((el) => {
		return el.sabor.includes(filtro);
	});
	return encontrado;
};
// funcion para dibujar el html
const contenedor = document.getElementById("container");

productos.forEach((producto) => {
	let card = document.createElement("div");
	card.classList.add("card", "col.sm-12", "col-lg-3");
	let contenido = `  <img src="${producto.imagen}" class="card-img-top" alt="...">
	<div class="card-body">
	  <h5 class="card-title">${producto.sabor}</h5>
	  <p class="card-text">$${producto.precio}</p>
	  <a href="#card" class="btn btn-bs-warning-bg-subtle" onClick="aniadirCarrito(${producto.id})" >Agregar Dulzura</a>
	</div>`;
	card.innerHTML = contenido;
	contenedor.appendChild(card);
});

let viendoCarrito = document.getElementById("cart");

let aniadirCarrito = (id) => {
	const producto = productos.find((el) => el.id == id); //arreglar para q me acepte mas de uno y se vayan sumando
	const productoExistente = carritoCompra.find((el) => el.id === producto.id);

	if (productoExistente) {
		// Si el producto ya existe, incrementar su cantidad
		productoExistente.cantidad++;
	} else {
		// Si es un nuevo producto, añadirlo al carrito con cantidad 1
		producto.cantidad = 1;
		carritoCompra.push(producto);
	}

	viendoCarrito.className = "card-carrito";
	viendoCarrito.innerHTML = "";
	const contenedorCarrito = document.createElement("div");
	contenedorCarrito.classList.add("contenedorCarrito");
	carritoCompra.forEach((producto) => {
		contenedorCarrito.innerHTML = `<img class="carrComp" src="${
			producto.imagen
		}"/>
		<div class="productoEnCarrito">
		${producto.sabor}
		</div>
		<div class= "productoEnCarrito"> Cantidad: ${producto.cantidad}</div>
		<div class= "productoEnCarrito"> Precio: ${producto.precio}</div>
		<div class= "productoEnCarrito"> Subtotal: ${
			producto.precio * producto.cantidad
		}</div>
		<button class= "btn btn-bs-warning-bg-subtle" id = "removerProducto" onClick="removerProducto(${
			producto.id
		})">Quitar Dulzura</button>
		<div> Total: $${producto.precio * producto.cantidad}</div>
		`;
	});
	viendoCarrito.appendChild(contenedorCarrito);
};

//evento en el input
const inputSearch = document.querySelector(".form-control");

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

/* guardarEnLS(carritoCompra); */

if (localStorage.getItem("productos")) {
	dulzuras = JSON.parse(localStorage.getItem("productos"));
} else {
	carritoCompra = productos;
}
