function quantitativaContinua(max, min, totalElem){
    
    let amplitude = max - min //calcula a amplitude da serie
    let classeLinha = Number(Math.round(Math.sqrt(totalElem)));
    let resto = 1
        while(resto == 1){
            if(amplitude % classeLinha != 0){
                amplitude ++;
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
        let freqAcu = []
        let acumulador = 0
        let posicao 
        let mediana 
        for(let i in acum){
            acumulador = acumulador + acum[i]
            freqAcu.push(acumulador)   
        }
        if(freqAcu.length - 1 % 2 ==0){
            posicao = []
            mediana = []
            posicao.push(freqAcu.length - 1 % 2)
            posicao.push(posicao[0] + 1)
            for(let i = 0; i < freqAcu.length; i++){
                if(freqAcu[i] >= posicao[1]){
                    mediana[0] = vetor[i]
                    break
                }
            }
            for(let i = 0; i < freqAcu.length; i++){
                if(freqAcu[i] >= posicao[1]){
                    mediana.push(vetor[i])
                    break
                }
            }
            if(mediana[0] == mediana[1]) mediana = mediana[0]
        }else{
            posicao = freqAcu / 2
            for(let i = 0; i <freqAcu.length; i++){
                if(freqAcu[i] >= posicao){
                    return mediana = vetor[i]
                }
            }
        }
        
        return mediana
    }

  }

function moda() {
    if(document.getElementById('variaveis').value != "quantitativaContinua"){
        let moda = []
        let indiceMax = Object.keys(trataInput().countElements)
        let contador = extraiObj(trataInput().countElements)
    
        if(Math.max.apply(null,contador) == 1){
            return "serie amodal"
        }else{
            for(let i =0; i< contador.length; i++){
                if(contador[i] == Math.max.apply(null,contador)){
            
                moda.push(indiceMax[i]);
            }
        }
        return moda;
        }
    }else{
        let moda = []
        let indiceMax = Math.max.apply(null,trataQuantitativaContinua().frequenciaQuantContinua)
        let contador = trataQuantitativaContinua().frequenciaQuantContinua
        if(indiceMax == 1){
            return "serie amodal"
        }else{
            for(let i = 0; i < contador.length;i++){
                if(contador[i] == indiceMax){
                    moda.push(trataQuantitativaContinua().pontoMedio[i])
                }
            }
        }
        
        return moda;
        }
        
    }


// Precisa acertar o calculo da função
function desviopadrao(){

    let mediaDesvio = media() || undefined
    let lista = trataInput().sheetParamters;
    let varianca = 0;
    let getAmostraPopulação = document.querySelector('input[name="tipo"]:checked').value;
    let desvio 
    let coeficienteVariacao

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

function medidasSeparatrizes(){
    let separatriz = document.getElementById("barraMedidas").value;
    let separador 
    if(separatriz !== 100 && separatriz !== 0){
        separador = Math.round(separatriz/ trataInput().sheetParamters.length)
        return trataInput().sheetParamters[separador]
    }else if(separatriz == 100){
        return trataInput().maiorNumero
    }
}
