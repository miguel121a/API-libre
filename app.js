const mostrarCategorias = (categorias) => {
    const select = document.getElementById("categorias");
    select.innerHTML = "";

    categorias.forEach(c => {
        const option = document.createElement("option");
        option.value = c.strCategory;
        option.textContent = c.strCategory;
        select.appendChild(option);
    });
}

const cargarCategorias = () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const categorias = data.drinks;
            console.log("Categorías recibidas:", categorias);
            mostrarCategorias(categorias);

            // Al cargar, mostramos la primera categoría automáticamente
            if(categorias.length > 0){
                cargarCoctelesPorCategoria(categorias[0].strCategory);
            }
        })
        .catch(error => {
            console.error("Error al cargar categorías:", error);
            alert("Hubo un error al cargar las categorías. Revisa la consola.");
        })
}

const mostrarCocteles = (cocteles) => {
    const contenedor = document.getElementById("conCocteles");
    contenedor.innerHTML = "";

    if(!cocteles){
        contenedor.innerHTML = "<p>No se encontraron cocteles.</p>";
        return;
    }

    cocteles.forEach(c => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${c.strDrink}</h3>
            <img src="${c.strDrinkThumb}" alt="${c.strDrink}" width="150">
        `;

        card.addEventListener("click", () => {
            console.log("ID del coctel que se guardará:", c.idDrink);
            localStorage.setItem("cocktailId", c.idDrink);
            window.location.href = "detalle.html";
        });
        contenedor.appendChild(card);
    });
}

// Función para cargar cocteles según la categoría seleccionada
const cargarCoctelesPorCategoria = (categoria) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const cocteles = data.drinks;
            console.log("Cocteles recibidos:", cocteles);
            mostrarCocteles(cocteles);
        })
        .catch(error => {
            console.error("Error al cargar cocteles:", error);
            alert("Hubo un error al cargar los cocteles. Revisa la consola.");
        })
}

const buscar = () => {
    btnBuscar.addEventListener("click", () => {
    const query = inputBuscar.value.trim();
    if(query === ""){
        alert("Escribe el nombre de un coctel para buscar");
        return;
    }

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const cocteles = data.drinks;
            if(!cocteles){
                alert("No se encontraron cocteles con ese nombre");
                return;
            }
            mostrarCocteles(cocteles);
        })
        .catch(error => {
            console.error("Error al buscar coctel:", error);
            alert("Hubo un error al buscar el coctel. Revisa la consola.");
        });
});

}

document.getElementById("categorias").addEventListener("change", (e) => {
    const categoria = e.target.value;
    cargarCoctelesPorCategoria(categoria);
});

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    buscar();
});
