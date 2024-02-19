btnConvertir.addEventListener("click", async function() {
    const tipoMoneda = document.getElementById("tipo-moneda");
    const selectValue = tipoMoneda.value;

    try {
        const data = await adquirirApi(`https://mindicador.cl/api/${selectValue}`); 
        console.log(data);

        await renderGrafica(data); 
    } catch (error) {
        console.error(error); 
    }
});

async function getChart(data) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    const labels = data.serie.map(entry => formatDate(entry.fecha)); 
    const valores = data.serie.map(entry => entry.valor); 

    const datasets = [{
        label: data.nombre,
        borderColor: "rgb(0, 74, 119)",
        data: valores
    }];

    return { labels, datasets };
}

async function renderGrafica(data) {
    const chartData = await getChart(data);
    const canvasContainer = document.getElementById("chart-container");
    const canvas = document.createElement("canvas");
    canvasContainer.innerHTML = ""; 
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: chartData
    });
}




