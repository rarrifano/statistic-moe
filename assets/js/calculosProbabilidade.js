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
        alert("Insria todos os dados")
        let botao = document.getElementById('calcular')
        botao.setAttribute("data-target", "")
        apagar()
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

function probBinomial(){

    let sucesso = Number(document.getElementById("sucesso").value)/100
    let fracasso = Number(document.getElementById("fracasso").value)/100
    let evento = Number(document.getElementById("evento").value)
    let tamanhoAmostra = Number(document.getElementById("tamanhoAmostra").value)
  
    //captura a div que onde será escrito o resultado
    let escrever = document.getElementById("resultado")
    if(sucesso == '' || fracasso == '' || evento == '' || tamanhoAmostra == ''){
        alert("Insria todos os dados")
        let botao = document.getElementById('calcular2')
        botao.setAttribute("data-target", "")
        apagar()
    }else if(sucesso + fracasso != 1){
        alert("O sucesso mais o fracasso tem que ser igual a 100, verifique os dados")
        let botao = document.getElementById('calcular2')
        botao.setAttribute("data-target", "")
        apagar()
    }else{
        //calculo da média
        let media = tamanhoAmostra * fracasso

        //caculo do desvio padrão
        let desvioPadrao = Math.sqrt(tamanhoAmostra * sucesso * fracasso)
        // calculo das variaveis para a probabilidade
        let analise = analiseComb(tamanhoAmostra, evento)
        let sucessoElevado = Math.pow(sucesso,evento)
        let amostraMenosEvento = tamanhoAmostra - evento
        let fracassoElevado = Math.pow(fracasso, amostraMenosEvento)
        
        //calculo da probabilidade
        let probabilidade = analise * sucessoElevado * fracassoElevado

        

        escrever.innerHTML += `<p> Probabilidade: ${(probabilidade*100).toFixed(2)} %`
        escrever.innerHTML += `<p> Média: ${media.toFixed(2)}`
        escrever.innerHTML += `<p> Desvio Padrão: ${desvioPadrao.toFixed(2)}`
    }

}

function probNormal(){
    //captura a div que onde será escrito o resultado
    let escrever = document.getElementById("resultado")
    alert("Em desenvolvimento")
}

function fatorial(n) {
    //função recursiva responsável por fazer o calculo do fatorial de um numero
    if(n < 0) return 0
    else if(n == 0) return 1
    else return n * fatorial(n - 1)
}

function analiseComb(n,k){
    //fução para calculo de analise combinatória
    if(n == 0 || k == 0 || n == k || k == n){
    /*primeiro há o tratamento dos casos especiais cujo o resultado é 1 
      quando é feita a analise com 0 ou os dois numeros são iguais o resultado é 1
    */
        return 1
    }else if(n == 1 || k == 1){
    //caso seja feita a analise combinatória com 1 o resultado é o numero diferente de 1
        if(n != 1 && n != 0){
            return n
        }else if(k !=1 && k != 0){
            return k
        }
         
    }else{
    //caso contrário é feito o calculo da analise combinatória de acordo com a formula: n! / (n-k)! * k!
        let fatorialN = fatorial(n)
        let fatorialK = fatorial(k)
        let fatorialNMenosK = fatorial(n - k)

        let combinatoria = fatorialN/(fatorialNMenosK * fatorialK)

        return combinatoria
    }
}
