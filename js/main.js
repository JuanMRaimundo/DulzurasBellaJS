const cobertura = ["Salta", "San Lorenzo", "Tres Cerritos", "San Luis"];

let carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];

const viendoCarrito = document.getElementById("cart");
const agregarTotal = document.getElementById("total");
const finalizarCompra = document.querySelector(".finalizar");
const inputSearch = document.querySelector(".form-control");
const contenedor = document.getElementById("container");
const zonas = document.getElementById("zonas");
const btnSearch = document.querySelector(".btn-busqueda");



function guardarEnLS(clave, arr) {
    localStorage.setItem(clave, JSON.stringify(arr));
}


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



const dibujarProductos = (productos) => {
    contenedor.innerHTML = "";
    
    if(productos.length === 0) {
        contenedor.innerHTML = `<div class="col-12 text-center text-muted">No encontramos productos con ese nombre 😢</div>`;
        return;
    }

    productos.forEach((producto) => {
        let col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-3"); 
        
        let contenido = `
            <div class="card card-product h-100 shadow-sm border-0">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${producto.sabor}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title fw-bold">${producto.sabor}</h5>
                        <p class="text-muted small">${producto.tipo}</p>
                    </div>
                    <div class="mt-3">
                        <span class="d-block fs-5 fw-bold text-dark mb-2">$${producto.precio}</span>
                        <button id="agregar-${producto.id}" class="btn w-100" style="background-color: #f7d358; border: 1px solid #e0c050;">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>`;
        
        col.innerHTML = contenido;
        contenedor.appendChild(col);
        
        const boton = document.getElementById(`agregar-${producto.id}`);
        boton.addEventListener("click", () => {
            aniadirCarrito(productos, producto.id);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Agregado!',
                showConfirmButton: false,
                timer: 800,
                toast: true,
                background: '#fff3cd'
            })
        });
    });
};



const aniadirCarrito = (productos, id) => {
    // Buscar si ya existe
    const existe = carritoCompra.some(prod => prod.id === id);

    if (!existe) {
        const producto = productos.find(prod => prod.id === id);
        carritoCompra.push({ ...producto, cantidad: 1 });
    } else {
        const producto = carritoCompra.find(prod => prod.id === id);
        producto.cantidad++;
    }
    
    guardarEnLS("carrito", carritoCompra);
    renderizarCarrito();
};

const removerProducto = (index) => {
    carritoCompra.splice(index, 1);
    guardarEnLS("carrito", carritoCompra);
    renderizarCarrito();
};



let renderizarCarrito = () => {
    viendoCarrito.innerHTML = "";
    

    if (carritoCompra.length === 0) {
        viendoCarrito.innerHTML = `<div class="alert alert-secondary text-center">Tu carrito está vacío</div>`;
        agregarTotal.innerHTML = "";
        finalizarCompra.innerHTML = ""; 
        return;
    }


    const headers = document.createElement("div");
    headers.className = "row fw-bold border-bottom pb-2 mb-2 d-none d-md-flex";
    headers.innerHTML = `
        <div class="col-5">Producto</div>
        <div class="col-3">Precio Unit.</div>
        <div class="col-3">Subtotal</div>
        <div class="col-1"></div>
    `;
    viendoCarrito.appendChild(headers);


    carritoCompra.forEach((item, index) => {
        const fila = document.createElement("div");
        fila.className = "row align-items-center mb-3 border-bottom pb-2";
        
        fila.innerHTML = `
            <div class="col-5">
                <span class="fw-bold">${item.sabor}</span>
                <span class="badge bg-secondary ms-1">x${item.cantidad}</span>
            </div>
            <div class="col-3 text-muted">
                $${item.precio}
            </div>
            <div class="col-3 fw-bold">
                $${item.precio * item.cantidad}
            </div>
            <div class="col-1 text-end">
                <button class="btn btn-sm btn-outline-danger remover-btn" data-index="${index}">
                    <i class="bi bi-trash"></i> X
                </button>
            </div>
        `;

   
        fila.querySelector(".remover-btn").addEventListener("click", () => {
            removerProducto(index);
        });

        viendoCarrito.appendChild(fila);
    });

  
    let total = carritoCompra.reduce((acc, el) => acc + el.precio * el.cantidad, 0);


    agregarTotal.innerHTML = `<div class="alert alert-warning text-end fw-bold fs-5">Total a pagar: $${total}</div>`;


    finalizarCompra.innerHTML = `<button class="btn btn-success w-100 btn-lg">Finalizar Compra</button>`;
    

    finalizarCompra.querySelector("button").addEventListener("click", () => {
        finalizando();
    });
};



async function finalizando() {
  
    const { value: formValues } = await Swal.fire({
        title: "Completa tus datos",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nombre completo">
            <input id="swal-input2" class="swal2-input" placeholder="Dirección de envío">
        `,
        focusConfirm: false,
        confirmButtonText: 'Confirmar Pedido',
        confirmButtonColor: '#198754',
        showCancelButton: true
    });

    if (formValues) {
    
        const spinner = document.getElementById("spinner");
        spinner.classList.remove("d-none");
        document.getElementById("seccion-carrito").style.opacity = "0.5";

     
        setTimeout(() => {
            spinner.classList.add("d-none");
            document.getElementById("seccion-carrito").style.opacity = "1";

    
            carritoCompra = [];
            guardarEnLS("carrito", carritoCompra);
            renderizarCarrito(); 

           
            Swal.fire({
                icon: 'success',
                title: '¡Compra Exitosa!',
                text: 'Tus dulzuras están en camino 🥐',
                confirmButtonColor: '#f7d358'
            });

        }, 2000);
    }
}


let productos = []; 


const busqueda = (filtro) => {
    if (!filtro || filtro.trim() === "") {
        dibujarProductos(productos);
    } else {
        const filtrados = filtrar(productos, filtro, "sabor");
        dibujarProductos(filtrados);
    }
};

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    busqueda(inputSearch.value);
});


inputSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        busqueda(inputSearch.value);
    }
});


inputSearch.addEventListener("input", () => {
    busqueda(inputSearch.value);
});


fetch("./data/db.json")
    .then((response) => response.json())
    .then((data) => {
        productos = data; /
        dibujarProductos(productos);
        renderizarCarrito(); 
        
       
        const zonaCobertura = [...cobertura];
        zonas.innerHTML = `<div>Encontranos en: ${zonaCobertura.join(", ")}</div>`;
    })
    .catch((error) => {
        console.error("Error al cargar productos:", error);
        contenedor.innerHTML = `<div class="alert alert-danger">Error cargando los productos. Intente más tarde.</div>`;
    });
