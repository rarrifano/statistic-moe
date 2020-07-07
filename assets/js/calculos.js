function quantitativaContinua(max, min, totalElem){
    
    let amplitude = max - min //calcula a amplitude da serie
    let classeLinha = Number(Math.floor(Math.sqrt(totalElem)));
    let resto = 1
    
        while(resto == 1){
            if(amplitude % classeLinha != 0){
                let cont = 0 
                if(cont == 0){
                    classeLinha = classeLinha + 1;
                    cont++
                }else if(cont == 1){
                    classeLinha = classeLinha + 1
                    cont ++
                }else if(cont == 2){
                    amplitude ++
                    cont = 0
                }
            }else if(amplitude % classeLinha == 0){
                let resultado = amplitude / classeLinha;
                resto = 0;
                this.formatoTabela = [classeLinha, resultado];
            }
        }
    return formatoTabela;
}

function media() {
    if(document.getElementById('variaveis').value == "quantitativaDiscreta"){
        let media = (trataInput().sheetParamters.reduce((a,b) => a + b)/trataInput().totaldeIndicesvetor).toFixed(2)
        return media
    }else if(document.getElementById('variaveis').value == "quantitativaContinua"){
        let mediaQntCont = []
        let pontoMedio = trataQuantitativaContinua().pontoMedio
        let frequenciaQuantContinua = trataQuantitativaContinua().frequenciaQuantContinua
    for(i in frequenciaQuantContinua){
        
        mediaQntCont.push(pontoMedio[i] * frequenciaQuantContinua[i])
    }
    mediaQntCont = (mediaQntCont.reduce((a,b) => a + b)/trataInput().totaldeIndicesvetor).toFixed(2)
        return mediaQntCont
    }
    
    
}

function mediana(vetor){
    let variavel = document.getElementById('variaveis').value
    var meio = Math.floor(vetor.length / 2);
    if(variavel == "quantitativaDiscreta"){
        
        if (vetor.length % 2){
            return vetor[meio];
    
        }else{
            return (vetor[meio - 1] + vetor[meio]) / 2;
        }
        
    }else if(variavel == "qualitativaNominal" || variavel == "qualitativaOrdinal"){
        return(vetor[meio])

    }else if(variavel =="quantitativaContinua"){
        let acum = trataQuantitativaContinua().frequenciaQuantContinua
        let numeros = vetor
        let limSup = trataQuantitativaContinua().limiteSuperior
        let limInf = trataQuantitativaContinua().limiteInferior
        let freqAcu = []
        let acumulador = 0;
        let posição = Math.floor(numeros.length / 2)
        let freqAcuAnt
        let freqSimplesAtual
        let limiteInfClassAtual
        let medianaQuantCont
        let intervaloClasse = trataQuantitativaContinua().parametrosTabela[1]
        for(let i in acum){
            acumulador = acumulador + acum[i]
            freqAcu.push(acumulador)   
        }
        for(let i = 0; i < limInf.length; i++){

            if(numeros[posição] >= limInf[i] && numeros[posição] < limSup[i]){
                freqAcuAnt = freqAcu[i-1] || 0
                freqSimplesAtual = acum[i]
                limiteInfClassAtual = limInf[i]
                break
            }
        }
       medianaQuantCont = limiteInfClassAtual + ((posição - freqAcuAnt)/freqSimplesAtual * intervaloClasse)
       return medianaQuantCont.toFixed(2)
    }
  }

function moda() {
    if(document.getElementById('variaveis').value != "quantitativaContinua"){
        let modaNormal = []
        let indiceMax = Object.keys(trataInput().countElements)
        let contador = extraiObj(trataInput().countElements)
    
        if(Math.max.apply(null,contador) == 1){
            return "serie amodal"
        }else{
            for(let i =0; i< contador.length; i++){
                if(contador[i] == Math.max.apply(null,contador)){
            
                modaNormal.push(indiceMax[i]);
            }
        }
        return modaNormal;
        }
    }else{
        let modaQuantCont = []
        let indiceMax = Math.max.apply(null,trataQuantitativaContinua().frequenciaQuantContinua)
        let contador = trataQuantitativaContinua().frequenciaQuantContinua
            for(let i = 0; i < contador.length;i++){
                if(contador[i] == indiceMax){
                    modaQuantCont.push(trataQuantitativaContinua().pontoMedio[i])
                }
            }
            return modaQuantCont;
        }
        
    }
        



// Precisa acertar o calculo da função
function desviopadrao(){

    let mediaDesvio = media() || undefined
    let lista = trataInput().sheetParamters;
    let varianca = 0;
    let getAmostraPopulação = document.querySelector('input[name="tipo"]:checked').value;
    let variavel = document.getElementById('variaveis').value
    let desvio 
    let coeficienteVariacao
    if(variavel =="quantitativaContinua"){
        let pontoMedio = trataQuantitativaContinua().pontoMedio
        let total = trataInput().totaldeIndicesvetor
        let freq = trataQuantitativaContinua().frequenciaQuantContinua
        let somatoria = []
        for(let i = 0; i < pontoMedio.length; i++){
            somatoria.push(Math.pow(pontoMedio[i] - mediaDesvio,2)*freq[i])
        }
        somatoria = somatoria.reduce((a,b) => a+b)
        desvio = Math.sqrt(somatoria/total).toFixed(2)
        coeficienteVariacao = ((desvio/mediaDesvio) * 100).toFixed(2) + '%'
        return{desvio,coeficienteVariacao}
    }else{
        if(mediaDesvio == undefined){
            coeficienteVariacao = "-"
            desvio = "-"
            return{desvio, varianca}
        }
        for (var i = 0;i < lista.length; i++) {
            varianca += (lista[i] - mediaDesvio) * (lista[i] - mediaDesvio);
        }
        
        if(getAmostraPopulação == 'populacao'){
            varianca = (varianca/lista.length).toFixed(2);
            desvio = Math.sqrt(varianca).toFixed(2);
        }
        else{
            varianca = (varianca/lista.length -1).toFixed(2);
            desvio = Math.sqrt(varianca).toFixed(2);
        }
        coeficienteVariacao = ((desvio/mediaDesvio) * 100).toFixed(2) + '%'
        return {desvio, coeficienteVariacao};
    }
    
}   

function medidasSeparatrizes(){
    let separatriz = Number(document.getElementById("barraMedidas").value)/100;
    let separador;
    let variavel = document.getElementById("variaveis").value;
    if(variavel != "quantitativaContinua"){
        if(separatriz !== 100 && separatriz !== 0){
            separador = Math.round(separatriz * trataInput().sheetParamters.length)
            return trataInput().sheetParamters[separador]
        }else if(separatriz == 100){
            return trataInput().maiorNumero
        }
    }else{
        let dados = trataInput().sheetParamters
        let acum = trataQuantitativaContinua().frequenciaQuantContinua
        let limSup = trataQuantitativaContinua().limiteSuperior
        let limInf = trataQuantitativaContinua().limiteInferior
        let freqAcu = []
        let acumulador = 0;
        let posição = separatriz * trataInput().sheetParamters.length
        let freqAcuAnt
        let freqSimplesAtual
        let limiteInfClassAtual
        let resultado
        let intervaloClasse = trataQuantitativaContinua().parametrosTabela[1]
        for(let i in acum){
            acumulador = acumulador + acum[i]
            freqAcu.push(acumulador)   
        }
        for(let i = 0; i < limInf.length; i++){

            if(dados[posição] >= limInf[i] && dados[posição] < limSup[i]){
                freqAcuAnt = freqAcu[i-1] || 0
                freqSimplesAtual = acum[i]
                limiteInfClassAtual = limInf[i]
                break
            }
        }
       resultado = limiteInfClassAtual + ((posição - freqAcuAnt)/freqSimplesAtual * intervaloClasse) 
       return resultado.toFixed(2)
    }
    
}
