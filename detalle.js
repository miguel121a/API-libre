const obtenerDetalle = (coctel) => {
    const contenedor = document.getElementById("detalles");

    contenedor.innerHTML = ""; // Limpiamos contenido previo

    // Lista de ingredientes
    let ingredientes = "";
    for (let i = 1; i <= 15; i++) {
        if (coctel[`strIngredient${i}`]) {
            ingredientes += `<li>${coctel[`strIngredient${i}`]} - ${coctel[`strMeasure${i}`] || ""}</li>`;
        }
    }

    const card = document.createElement("div");

    card.innerHTML = `
        <h1>${coctel.strDrink}</h1>
        <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}" width="300">
        <h3>Ingredientes:</h3>
        <ul>${ingredientes}</ul>
        <h3>Instrucciones:</h3>
        <p>${coctel.strInstructions}</p>
        <a href="index.html">Volver</a>
    `;

    contenedor.appendChild(card);
};

const cargarDetalle = () => {
    const cocktailId = localStorage.getItem("cocktailId");

    if (!cocktailId) {
        alert("No se seleccionó ningún coctel. Redirigiendo a inicio...");
        window.location.href = "index.html";
        return;
    }

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const coctel = data.drinks[0];
            console.log("Detalle recibido:", coctel);
            obtenerDetalle(coctel);
        })
        .catch(error => {
            console.error("Error al cargar detalle:", error);
            alert("Hubo un error al cargar el detalle del coctel. Revisa la consola.");
            window.location.href = "index.html"; // redirigimos si falla
        });
};

document.addEventListener("DOMContentLoaded", () => {
    cargarDetalle();
});

