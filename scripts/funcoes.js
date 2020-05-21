var elButton = document.querySelector(".box .content .execButton");
var elChart = document.querySelector(".box .content #grafico");

function trataInput(){
    let valor = document.getElementById("inputValores").value
    
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
    let coluna2 = extraiObj(trataInput().countElements)
    
    this.dados = {
        elemento1: coluna1,
        elemento2: coluna2
    }
    
    //console.log(dados.elemento1[0])
    for(let i of cabecalho){
        let th = document.createElement('th');
        let texto = document.createTextNode(i);
        th.appendChild(texto);
        linhas.appendChild(th);
    }
    
    for(let elemento in dados.elemento){
        
        let linhaTabela = tabela.insertRow();
        let celula = linhaTabela.insertCell();
        
        for(chave in dados.elemento){
            
            console.log("Elemento = " + elemento)
            console.log('Chave = ' + chave)
            
            let textoLinhas = document.createTextNode(dados.elemento[chave]);
            celula.appendChild(textoLinhas);
        }
    }
}

function execRender(){
    var tipoVariavel = document.getElementById('variaveis').value
    console.log('Média:' + trataInput().media)
    console.log('Mediana: ' + mediana(trataInput().sheetParamters))
    console.log('Moda: ' + moda())
    if(tipoVariavel === ''){       
        alert('Erro: Selecione o tipo de variavel')
    }else if(tipoVariavel !== 'qualitativa'){
        geraTabela();
        criaGrafico();
    }else{
        geraTabela()
        criaGraficoPizza()
    }        
}

elButton.onclick = execRender;