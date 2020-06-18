function apagar() {
    modal = document.querySelector("#resultadoInterior")
    modal.innerHTML = ""
}

function intervalo(x) {
    valor = x.value
    section = document.querySelector("#escolhaintervalo")
    tamanhojanela = document.querySelector("#prob")

    if (valor == "menor-que") {
        section.innerHTML = `<input type="text" placeholder="Menor Que" class="form-control" id="iamenor">`
    }
    if (valor == "entre") {
        section.innerHTML = `<input type="text" placeholder="Entre" class="form-control" id="iaentremenor"> E <input type="text " placeholder="Entre" class="form-control" id="iaentremaior">`
    }
    if (valor == "maior-que") {
        section.innerHTML = `<input type="text" placeholder="Maior Que" class="form-control" id="iamaior">`
    }
}
