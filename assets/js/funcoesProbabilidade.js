function apagar() {
    modal = document.querySelector("#resultado")
    modal.innerHTML = ""
}

function intervalo(x) {
    valor = x.value
    section = document.querySelector("#escolhaintervalo")

    if (valor == "menor-que") {
        section.innerHTML = `<input type="text" placeholder="Menor Que" class="form-control" id="menor">`
    }
    if (valor == "entre") {
        section.innerHTML = `<input type="text" placeholder="Entre" class="form-control" id="entreMenor"> E <input type="text " placeholder="Entre" class="form-control" id="entreMaior">`
    }
    if (valor == "maior-que") {
        section.innerHTML = `<input type="text" placeholder="Maior Que" class="form-control" id="maior">`
    }
}
