function probNominal(){
    
    let valorPonto = document.getElementById("selecionaNominal").value
    let valorMin = Number(document.getElementById("min").value)
    let valorMax = Number(document.getElementById("max").value)
    let media = (Number(valorMax) + Number(valorMin))/2
    let desvioPadrao = Math.sqrt((((valorMax - valorMin) * (valorMax - valorMin))/12)).toFixed(2)
    let coefVariacao = (desvioPadrao/media)*100

    let escreveMedia = document.getElementById("media")
    let escreveDesvio = document.getElementById("desvioPadrao")
    let escreveCoef = document.getElementById("cVariacao")
    let escreveProb = document.getElementById("probabilidade")
    
    escreveMedia.innerText += `${media}` 
    escreveDesvio.innerText += `${desvioPadrao}`
    escreveCoef.innerText += `${coefVariacao.toFixed(2)}`

    if(valorPonto == ""){

        let modal = document.getElementById("staticBackdrop")
        modal.hidden
        alert("Favor Insira os dados")

    }else if(valorPonto == "maior-que"){

        let maiorQue = Number(document.getElementById("maior").value)
        let intervalo = valorMax - maiorQue
        let probabilidade  = (1/(valorMax - valorMin))* intervalo
        escreveProb.innerText += `${(probabilidade*100).toFixed(2)}%`

    }else if(valorPonto == "menor-que"){

        let menorQue = Number(document.getElementById("menor").value)
        let intervalo = menorQue - valorMin
        let probabilidade  = (1/(valorMax - valorMin))* intervalo
        escreveProb.innerText += `${(probabilidade*100).toFixed(2)}%`

    }else if(valorPonto == "entre"){

        let entreInf = Number(document.getElementById("entreMenor").value)
        let entreSup = Number(document.getElementById("entreMaior").value)
        let intervalo = entreSup - entreInf
        let probabilidade  = (1/(valorMax - valorMin))* intervalo
        escreveProb.innerText += `${(probabilidade*100).toFixed(2)}%`
    }
}