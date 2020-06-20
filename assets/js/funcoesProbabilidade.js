function apagar() {
    modal = document.querySelector("#resultado")
    modal.innerHTML = ""
}

function intervalo(x) {
    valor = x.value
    section = document.querySelector("#escolhaintervalo")

    if (valor == "menor-que") {
        section.innerHTML = `<input type="number" placeholder="Menor Que" class="form-control" id="menor">`
    }
    if (valor == "entre") {
        section.innerHTML = `<input type="number" placeholder="Entre" class="form-control" id="entreMenor"> E <input type="number " placeholder="Entre" class="form-control" id="entreMaior">`
    }
    if (valor == "maior-que") {
        section.innerHTML = `<input type="number" placeholder="Maior Que" class="form-control" id="maior">`
    }
}

function intervalo2(x) {
    valor = x.value
    section = document.querySelector("#escolhaintervaloNormal")

    if (valor == "menor-que") {
        section.innerHTML = `<input type="number" placeholder="Menor Que" class="form-control" id="menor">`
    }
    if (valor == "entre") {
        section.innerHTML = `<input type="number" placeholder="Entre" class="form-control" id="entreMenor"> E <input type="number " placeholder="Entre" class="form-control" id="entreMaior">`
    }
    if (valor == "maior-que") {
        section.innerHTML = `<input type="number" placeholder="Maior Que" class="form-control" id="maior">`
    }
}