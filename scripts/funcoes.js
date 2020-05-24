var elButton = document.querySelector(".box .content .execButton");
var elChart = document.querySelector(".box .content #grafico");

function trataInput(){
    let valor = document.getElementById("inputValores").value;
    
    if(valor == ''){
        alert("Erro: insira dados válidos");
    }else{
        var sheetParamters = valor.split(';');
        let countElements = {};
        var sheetParamters = sheetParamters.map(Number)
        sheetParamters.sort((a,b) => a-b); //QuickSort
        sheetParamters.forEach(function(i){
            countElements[i] = (countElements[i]||0)+1;
        });

        let maiorNumero = sheetParamters.length - 1;
        let menorNumero = sheetParamters[0];
        let totaldeIndicesVetor = sheetParamters.length;
        let media = sheetParamters.reduce((a,b) => a + b)/totaldeIndicesVetor
        return {sheetParamters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements, media};
    }
}

function extraiObj(obj){
    this.frequencia = []
    for(let i in obj){
        frequencia.push(obj[i]);
        
    }
    return frequencia;
}

function geraTabela(){
    
    let tabela = document.getElementById('tabela');
    let titulos = tabela.createTHead();    
    let linhas = titulos.insertRow();
    let colunaTitulo = document.getElementById('inputTitulo').value || document.getElementById('variaveis').value
    let cabecalho = [colunaTitulo,'Fi', 'Fr%', 'Fac', 'Fac%']
    let coluna1 = Object.keys(trataInput().countElements)
    let frequenciaSimples = extraiObj(trataInput().countElements)
    let frequenciaAcumulada = []
    let linha = []
    let acumulador = 0
    
    for(i in frequenciaSimples){

        if(i == 0){
            acumulador = acumulador + frequenciaSimples[i]
            frequenciaAcumulada.push(acumulador)
        }else{
            acumulador = acumulador + frequenciaSimples[i]
            frequenciaAcumulada.push(acumulador)
        }
    }
    
    for(let i = 0; i < 4 ; i++){
        
        linha.push({elementos:coluna1[i], 
        frequenciaSimples: frequenciaSimples[i],
        frequenciaAcumulada:frequenciaAcumulada[i],
        })
    }
    
    for(let i of cabecalho){
        
        let th = document.createElement('th');
        let texto = document.createTextNode(i);
        
        th.appendChild(texto);
        linhas.appendChild(th);
    }
    for (let i of linha) {
        let row = tabela.insertRow();
        
        for (j in i) {         
            let celula = row.insertCell();
            let textoLinhas = document.createTextNode(i[j]);
            
            celula.appendChild(textoLinhas);
        }
    }
}   

function execRender(){
    var tipoVariavel = document.getElementById('variaveis').value;
    geraTabela();
    
    console.log('Média:' + trataInput().media);
    console.log('Mediana: ' + mediana(trataInput().sheetParamters));
    console.log('Moda: ' + moda());
    console.log('Desvio: ' + desviopadrao());
    console.log(trataInput().totaldeIndicesVetor);
    
    if(tipoVariavel === ''){       
        alert('Erro: Selecione o tipo de variavel');
    }else if(tipoVariavel !== 'qualitativa'){
        criaGrafico();
    }else{
        criaGraficoPizza();
    }        
}

elButton.onclick = execRender;