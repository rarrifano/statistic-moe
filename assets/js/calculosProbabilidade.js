function probNominal(){
    //captura os valores inseridos para realizar o calculo
    let valorPonto = document.getElementById("selecionaNominal").value
    let valorMin = Number(document.getElementById("min").value)
    let valorMax = Number(document.getElementById("max").value)

    //calculos de média, desvio padrão e coeficiente de variação
    let media = (Number(valorMax) + Number(valorMin))/2
    let desvioPadrao = Math.sqrt((((valorMax - valorMin) * (valorMax - valorMin))/12)).toFixed(2)
    let coefVariacao = (desvioPadrao/media)*100

    //captura a div que onde será escrito o resultado
    let escrever = document.getElementById("resultado")

    /*Faz o calculo da probabilidade de acordo com os dados inseridos 
      Se o usuário não informar algun dado aparecerá uma mensagem de erro
    */     
    if(valorPonto == "" || valorMin == "" || valorMax == ""){

        let botao = document.getElementById('staticBackdrop')
        botao.setAttribute("data-target", "")
        apagar()
        alert("Favor Insira os dados")

    }else if(valorPonto == "maior-que"){

        let maiorQue = Number(document.getElementById("maior").value)
        let intervalo = valorMax - maiorQue
        let probabilidade  = (1/(valorMax - valorMin))* intervalo
        escrever.innerHTML += `<p>Probabilidade: ${(probabilidade*100).toFixed(2)}% </p>`

    }else if(valorPonto == "menor-que"){

        let menorQue = Number(document.getElementById("menor").value)
        let intervalo = menorQue - valorMin
        let probabilidade  = (1/(valorMax - valorMin))* intervalo
        escrever.innerHTML += `<p>Probabilidade: ${(probabilidade*100).toFixed(2)}% </p>`

    }else if(valorPonto == "entre"){

        let entreInf = Number(document.getElementById("entreMenor").value)
        let entreSup = Number(document.getElementById("entreMaior").value)
        let intervalo = entreSup - entreInf
        let probabilidade  = (1/(valorMax - valorMin))* intervalo
        escrever.innerHTML += `<p>Probabilidade: ${(probabilidade*100).toFixed(2)}% </p>`
    }
    
    escrever.innerHTML += `<p>Média: ${media}</p>`
    escrever.innerHTML += `<p>Desvio Padrão: ${desvioPadrao}</p>`
    escrever.innerHTML += `<p>Coefeciente De Variação: ${coefVariacao.toFixed(2)}</p>`
}