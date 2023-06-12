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

let carritoCompra = []; //array para guardar la info q ingresa el usuario
let viendoCarrito = document.getElementById("cart");
let agregarTotal = document.getElementById("total");
let finalizarCompra = document.querySelector(".finalizar");
const inputSearch = document.querySelector(".form-control");
const contenedor = document.getElementById("container");
const zonas = document.getElementById("zonas");

//funcion guardar productos en el LS
function guardarEnLS(clave, arr) {
	localStorage.setItem(clave, JSON.stringify(arr));
}
guardarEnLS("productos", productos);

//evento en el input

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

localStorage.getItem("productos")
	? (dulzuras = JSON.parse(localStorage.getItem("productos")))
	: (carritoCompra = productos);

//array para trabajar desde el LS
const productosLS = JSON.parse(localStorage.getItem("productos"));

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

const dibujarProductos = (dulzuras) => {
	contenedor.innerHTML = "";
	dulzuras.forEach((producto) => {
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
};

dibujarProductos(productosLS);
//funcion  de filtro
const busqueda = function (arr, filtro) {
	const encontrado = arr.filter((el) => {
		return el.sabor.includes(filtro);
	});
	dibujarProductos(encontrado);
};

//funcion para dibujar y actualizar carrito
let renderizarCarrito = () => {
	viendoCarrito.className = "card-carrito";
	viendoCarrito.innerHTML = "";
	const contenedorCarrito = document.createElement("div");
	contenedorCarrito.classList.add("contenedorCarrito");
	carritoCompra.forEach((producto) => {
		contenedorCarrito.innerHTML += `<img class="carrComp" src="${
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
		
		`;
	});
	viendoCarrito.appendChild(contenedorCarrito);
};
//funcion para q se acumulen cantidades de productos y sumar total
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

	const totalCarrito = carritoCompra.reduce(
		(acc, el) => acc + el.precio * el.cantidad,
		0
	);
	agregarTotal.innerHTML = `<div class="carrTot"> Total: $${totalCarrito}</div>
	<button class="btn" onClick="guardarCarritoEnLS()"> Finalizar compra</button>
	`;

	renderizarCarrito();
};
//guardar carrito en LS y finalizar compra

const guardarCarritoEnLS = () => {
	finalizarCompra.innerHTML = ``;
	Swal.fire("En minutos, las Dulzuras serán tuyas");
	guardarEnLS("carrito", carritoCompra);
	dibujarProductos(productosLS);
};

//funcion remover del carrito

const removerProducto = (id) => {
	let indice = carritoCompra.findIndex((producto) => producto.id === id);

	if (indice !== -1) {
		carritoCompra.splice(indice, 1);
	}
	renderizarCarrito();
};

// desestructura cobertura

const zonaCobertura = [...cobertura];
console.log(zonaCobertura);
//pintar zonas en FT

let encontranos = () => {
	zonas.innerHTML = `<div>Encontranos en ${zonaCobertura}</div>`;
};
encontranos();
