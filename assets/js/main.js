const tipoMonedas = document.querySelector("#tipo-moneda");
const btnConvertir = document.querySelector("#btn-convertir");

 
btnConvertir.addEventListener("click", async function() {
    const inputValue = document.getElementById("input-value")
    const tipoMonedas = document.getElementById("tipo-moneda");
    const selectValue = tipoMonedas.value;
    const selectInputValue = inputValue.value

    try {
        const dataSet = await adquirirApi();
        switch (selectValue) {
            case "uf":
                const ufValue = dataSet.uf.valor;
                const result = ufValue * selectInputValue;
                crearElParrafo(result);
                break;
            case "dolar":
                const dolar = dataSet.dolar.valor;
                const result2 = selectInputValue / dolar ;
                crearElParrafo(result2);
                break;

            case "euro":
                const euro = dataSet.euro.valor;
                const result3 = selectInputValue / euro ;
                crearElParrafo(result3);
                break;
             
            case "utm":
                const utm = dataSet.utm.valor;
                const result4 = selectInputValue * utm ;
                crearElParrafo(result4);
                break;
            case "bitcoin":
                const bitcoin = dataSet.bitcoin.valor;
                const result5 = selectInputValue * bitcoin ;
                crearElParrafo(result5);
            default:
                console.log("Seleccione una moneda");
        }

    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
    }
});


async function adquirirApi(url = "https://mindicador.cl/api/") {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`¡Error HTTP! Estado: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("¡Hubo un error al adquirir la API:", error);
    }
}

function crearElParrafo(result){
    const resultHtmlFormat = result.toFixed(2);
    const resultHtml = document.getElementById("result-value");
    resultHtml.textContent = `Resultado: $${resultHtmlFormat}`; 
}
