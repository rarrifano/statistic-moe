function quantitativaContinua(max, min, totalElem){
    
    let amplitude = max - min //calcula a amplitude da serie
    let classeLinha = Number(Math.sqrt(totalElem).toFixed(0)) ;
    let classeLinhaMaisUm = classeLinha + 1;
    let classeLinhaMenosUm = classeLinha - 1;
    let resto = 1
    
        while(resto == 1){
            if(amplitude % classeLinhaMenosUm != 0 && amplitude % classeLinhaMaisUm != 0 && amplitude % classeLinhaMenosUm != 0){
                amplitude ++;
            }else if(amplitude % classeLinhaMaisUm == 0){
                let resultado = amplitude / classeLinhaMaisUm;
                resto = 0;
                this.formatoTabela = [classeLinhaMaisUm, resultado];
            }else if(amplitude % classeLinhaMenosUm == 0){
                let resultado = amplitude / classeLinhaMenosUm;
                resto = 0;
                this.formatoTabela = [classeLinhaMenosUm, resultado];
            }else if(amplitude % classeLinha == 0){
                let resultado = amplitude/classeLinha;
                resto = 0;
                this.formatoTabela = [classeLinha, resultado];
            } 
        }
    return formatoTabela;
}
/* Adicionar função para calculo de moda
Estratégia para criação da tabela e plotagem de alguns dados:
1-Pegar todos os dados das colunas e formar uma mátris com eles
2-Feito isso será usado dois fors
3-1º for ele escreverá o titulo
4-2º for ele depois escreverá os dados das linhas 
5-Com isso será feito a tabela
6-Será criada uma função para ser colocado os dados de: moda, media, mediana, desvio padrão 
7-Pensar em como será feito as medidas separatrizes */

//Verificar a lógica da função

function mediana(vetor){
    var meio = Math.floor(vetor.length / 2);
    if (vetor.length % 2){
        return vetor[meio];
    }
    return (vetor[meio - 1] + vetor[meio]) / 2;
  }

function mode() {
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

    var media = trataInput().media;
    var lista = trataInput().sheetParamters;
    var varianca = 0;

    for (var i = 0;i < lista.length; i++) {
        varianca += (media - lista[i]) * (media - lista[i]);
    }
    
    varianca = varianca/lista.length;
    return Math.sqrt(varianca);
}

