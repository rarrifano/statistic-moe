function quantitativaContinua(max, min, totalElem){
    
    let amplitude = max - min //calcula a amplitude da serie
    let classeLinha = Number(Math.sqrt(totalElem).toFixed(0));
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

function mediana(vetor){
    var meio = Math.floor(vetor.length / 2);
    if (vetor.length % 2){
        return vetor[meio];
    }
    return (vetor[meio - 1] + vetor[meio]) / 2;
  }

function moda() {
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
}

// Precisa acertar o calculo da função
function desviopadrao(){

    let media = trataInput().media
    let lista = trataInput().sheetParamters;
    let varianca = 0;
    let getAmostraPopulação = document.querySelector('input[name="tipo"]:checked').value;
    let desvio 
    let coeficienteVariacao
    if(media == undefined){
        coeficienteVariacao = "-"
        desvio = "-"
        return{desvio, varianca}
    }
    for (var i = 0;i < lista.length; i++) {
        varianca += (lista[i] - media) * (lista[i] - media);
    }
    
    if(getAmostraPopulação == 'populacao'){
        varianca = (varianca/lista.length).toFixed(2);
        desvio = Math.sqrt(varianca).toFixed(2);
    }
    else{
        varianca = (varianca/lista.length -1).toFixed(2);
        desvio = Math.sqrt(varianca).toFixed(2);
    }
    coeficienteVariacao = ((desvio/media) * 100).toFixed(2) + '%'
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