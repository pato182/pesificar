var precioDolar
const clasesPrecio = ".discount_final_price, .discount_original_price, .StoreOriginalPrice, .game_area_dlc_price, .game_purchase_price, ._3j4dI1yA7cRfCvK8h406OB, ._3fFFsvII7Y2KXNLDk_krOW, .pk-LoKoNmmPK4GBiC9DR8, ._2WLaY5TxjBGVyuWe_6KS3N, .DOnsaVcV0Is-, .ywNldZ-YzEE-, .match_subtitle"
const noConvertir = [
    "ARS$",
    "Demo gratuita",
    "Free to Play",
    "Gratuito",
    "Próximamente"
]

async function obtenerDolar() {
    try {
        const response = await fetch('https://dolarapi.com/v1/dolares/tarjeta')
        const data = await response.json()
        precioDolar = data.venta
    } catch (error) {
        console.error(error)
    }
}

async function convertirPrecio(element) {
    if (noConvertir.some(palabraClave => element.innerHTML.includes(palabraClave)) || (element.classList.contains("match_subtitle") && element.innerHTML == '')) return

    if (element.firstElementChild?.classList.contains("discount_block") || element.dataset.convertido === "true") return

    if (element.classList.contains("_2WLaY5TxjBGVyuWe_6KS3N")) {
        await new Promise(r => setTimeout(r, 500))
    }

    let precioOriginal = parseFloat(element.innerHTML.replace(/[^\d.,]/g, ""))
    let precioFinal = (precioOriginal * precioDolar)
    precioFinal += (precioFinal * 21) / 100
    precioFinal = precioFinal.toLocaleString("ES-ar", {minimumFractionDigits:2, maximumFractionDigits: 2})
    
    element.innerHTML = `ARS$ ${precioFinal}`
    element.dataset.convertido = "true"
}

async function main() {
    await obtenerDolar()

    document.querySelectorAll(clasesPrecio).forEach(convertirPrecio)

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(nodo => {
                if (nodo.nodeType !== 1) return
                const precios = nodo.querySelectorAll?.(clasesPrecio)
                precios.forEach(convertirPrecio)
            })
        })
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })

}

main()
