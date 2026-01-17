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
// funcion para dibujar el html
const dibujarProductos = (productos) => {
    contenedor.innerHTML = "";
    productos.forEach((producto) => {
        let col = document.createElement("div");
        // Usamos col-12 (celu), col-md-6 (tablet), col-lg-3 (pc) para respuesta responsiva
        col.classList.add("col-12", "col-md-6", "col-lg-3"); 
        
        let contenido = `
            <div class="card card-product h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.sabor}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${producto.sabor}</h5>
                        <p class="text-muted small">${producto.tipo}</p>
                    </div>
                    <div>
                        <span class="price-tag">$${producto.precio}</span>
                        <button id="agregar-${producto.id}" class="btn agregar-btn">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>`;
        
        col.innerHTML = contenido;
        contenedor.appendChild(col);
        
        const boton = document.getElementById(`agregar-${producto.id}`);
        boton.addEventListener("click", () => {
            aniadirCarrito(productos, producto.id);
            // Agregamos una alerta chiquita para feedback visual (Opcional)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito',
                showConfirmButton: false,
                timer: 1000,
                toast: true
            })
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
    
    // Contenedor limpio
    const contenedorCarrito = document.createElement("div");
    contenedorCarrito.classList.add("w-100"); // Ancho total

    if (carritoCompra.length === 0) {
        viendoCarrito.innerHTML = `<div class="alert alert-warning text-center" role="alert">Tu carrito está vacío 😢</div>`;
        agregarTotal.innerHTML = "";
        finalizarCompra.classList.add("d-none"); 
        return;
    }

    // Volvemos a mostrar el botón de finalizar si hay productos
    finalizarCompra.classList.remove("d-none");

    const headers = document.createElement("div");
    headers.innerHTML = `
        <div class="row fw-bold border-bottom pb-2 mb-2 text-center text-md-start">
            <div class="col-5">Producto</div>
            <div class="col-3">Unitario</div>
            <div class="col-3">Subtotal</div>
            <div class="col-1"></div>
        </div>
    `;
    contenedorCarrito.appendChild(headers);

    carritoCompra.forEach((item, index) => {
        const fila = document.createElement("div");
        fila.classList.add("row", "align-items-center", "mb-3", "border-bottom", "pb-2");
        
        // Estructura limpia: Nombre xCant | $Unit | $Subtotal | Eliminar
        fila.innerHTML = `
            <div class="col-5">
                <span class="fw-bold text-dark">${item.sabor}</span>
                <span class="badge text-bg-secondary ms-1">x${item.cantidad}</span>
            </div>
            <div class="col-3 text-muted">
                $${item.precio}
            </div>
            <div class="col-3 fw-bold text-dark">
                $${item.precio * item.cantidad}
            </div>
            <div class="col-1 text-end">
                <button class="btn btn-sm btn-outline-danger removerProducto border-0" data-index="${index}">
                    <i class="bi bi-trash"></i> X
                </button>
            </div>
        `;

        const botonRemover = fila.querySelector(".removerProducto");
        botonRemover.addEventListener("click", (e) => {
            // Usamos currentTarget para asegurar que agarramos el botón aunque hagamos click en el icono/texto
            const productIndex = e.currentTarget.dataset.index;
            removerProducto(productIndex);
        });

        contenedorCarrito.appendChild(fila);
    });

    viendoCarrito.appendChild(contenedorCarrito);

    // Calcular total
    let total = carritoCompra.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    // Renderizar zona de totales
    agregarTotal.innerHTML = `
        <div class="d-flex justify-content-end align-items-center mt-3 p-3 bg-light rounded">
            <h4 class="me-3 mb-0">Total: $${total}</h4>
            <button class="btn btn-success btn-lg finaliza">Finalizar compra</button>
        </div>
    `;
    
    // Reasignar evento al botón nuevo
    const final = document.querySelector(".finaliza");
    final.addEventListener("click", () => {
        finalizando();
    });
};
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
    // Mostrar Formulario
    const { value: formValues } = await Swal.fire({
        title: "Finalizá tu compra",
        html: `
            <form class="row g-3 text-start">
                <div class="col-12">
                    <label class="form-label">Nombre Completo</label>
                    <input type="text" class="form-control" placeholder="Tu nombre">
                </div>
                </form>
        `,
        confirmButtonText: 'Confirmar Compra',
        confirmButtonColor: '#d4a373', 
        showCancelButton: true,
        cancelButtonText: 'Seguir comprando'
    });

    if (formValues) {
      
        const spinner = document.getElementById("spinner");
        spinner.classList.remove("d-none"); 
        viendoCarrito.classList.add("opacity-50"); 

        //  Simular demora de red
        setTimeout(() => {
            //Ocultar Spinner
            spinner.classList.add("d-none"); 
            viendoCarrito.classList.remove("opacity-50");

            // Mensaje de Éxito
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu compra!',
                text: 'Te enviaremos el detalle por email.',
                confirmButtonColor: '#d4a373'
            }).then(() => {
                // Limpieza final
                carritoCompra = []; 
                localStorage.removeItem("carrito"); 
                renderizarCarrito(); 
            });
        }, 2000);
    }
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
