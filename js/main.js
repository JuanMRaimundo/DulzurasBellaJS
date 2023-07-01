const cobertura = ["Salta", "San Lorenzo", "Tres Cerritos", "San Luis"];
let carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];
let viendoCarrito = document.getElementById("cart");
let agregarTotal = document.getElementById("total");
let finalizarCompra = document.querySelector(".finalizar");
const inputSearch = document.querySelector(".form-control");
const contenedor = document.getElementById("container");
const zonas = document.getElementById("zonas");
const btnSearch = document.querySelector(".btn-busqueda");

//funcion guardar productos en el LS
function guardarEnLS(clave, arr) {
	localStorage.setItem(clave, JSON.stringify(arr));
}

//funcion de busqueda
function filtrar(arr, filtro, param) {
	return arr.filter((el) => {
		if (param == "precio") {
			return el.precio && el.precio <= parseFloat(filtro);
		} else if (el[param]) {
			return el[param].toLowerCase().includes(filtro.toLowerCase());
		}
		return false;
	});
}
//evento en el input

inputSearch.addEventListener("keyup", () => {
	inputSearch.value;
});

//fetch para busqueda
let productos = [];
// fetch para trabajar array desde .json
fetch("./data/db.json")
	.then((response) => response.json())
	.then((data) => {
		productos = data;
		dibujarProductos(productos);
		renderizarCarrito();
	})
	.catch((error) => {
		console.log("Error al obtener datos", error);
	});

// Función de búsqueda
const busqueda = function (filtro) {
	if (filtro.trim() === "") {
		// si el campo de búsqueda está vacío, muestra todos los productos
		dibujarProductos(productos);
	} else {
		const productosFiltrados = filtrar(productos, filtro, "sabor");
		dibujarProductos(productosFiltrados);
	}
};

// funcion para dibujar el html
const dibujarProductos = (productos) => {
	contenedor.innerHTML = "";
	productos.forEach((producto) => {
		let card = document.createElement("div");
		card.classList.add("card", "col-sm-6", "col-lg-3");
		let contenido = `  <img src="${producto.imagen}" class="card-img-top animate__pulse" alt="...">
		<div class="card-body">
		  <h5 class="card-title">${producto.sabor}</h5>
		  <p class="card-text">$${producto.precio}</p>
		  <button id="agregar-${producto.id}" class="btn btn-bs-warning-bg-subtle agregar-btn" >Agregar Dulzura</button>
		</div>`;
		card.innerHTML = contenido;
		contenedor.appendChild(card);
		const boton = document.getElementById(`agregar-${producto.id}`);
		boton.addEventListener("click", () => {
			aniadirCarrito(productos, producto.id);
		});
	});
};

let totalCarrito = carritoCompra.reduce(
	(acc, el) => acc + el.precio * el.cantidad,
	0
);

// funcion para añadir productos al carrito y se guarda en LS

const aniadirCarrito = (productos, id) => {
	if (!carritoCompra.some((producto) => producto.id === id)) {
		const producto = productos.find((producto) => producto.id === id);
		carritoCompra.push({ ...producto, cantidad: 1 });
	} else {
		const producto = carritoCompra.find((producto) => producto.id === id);
		producto.cantidad++;
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
	if (carritoCompra.length === 0) {
		viendoCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
		agregarTotal.innerHTML = "";
		finalizarCompra.classList.add("d-none");
		return;
	}

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

//finalizar compra, se agrega formulario y se borra el carrito del LS

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
		//barra de espera ficticia
		let barra = document.createElement("div");
		barra.classList.add("progress");
		barra.innerHTML = `<div class="indeterminate"></div>`;
		document.body.appendChild(barra);
	}
	setTimeout(() => {
		Swal.fire("Gracias por tu compra").then(() => {
			carritoCompra.splice(0); // Borrar datos del array carrito
			localStorage.removeItem("carrito"); // Borrar el carrito
			location.reload(); // Recargar la página
		});
	}, 2000);
}
// Asigna el evento click al botón de búsqueda
btnSearch.addEventListener("click", (e) => {
	e.preventDefault();
	const valorB = inputSearch.value;
	busqueda(valorB);
});

// desestructura cobertura

const zonaCobertura = [...cobertura];

//pintar zonas en FT

let encontranos = () => {
	zonas.innerHTML = `<div>Encontranos en ${zonaCobertura}</div>`;
};
encontranos();
