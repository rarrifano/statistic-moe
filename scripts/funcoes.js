var elButton = document.querySelector(".box .content .execButton");
var elChart = document.querySelector(".box .content #grafico");
//Adcionar função para calculo de moda
//Estratégia para criação da tabela e plotagem de alguns dados:
//1- pegar todos os dados das colunas e formar uma matris com eles
//2- feito isso será usado dois fors
//3- 1º for ele escreverá o titulo
//4- 2º for ele depois escreverá os dados das linhas 
//5- com isso será feito a tabela
//6- Depois será criada uma função para ser colocado os dados de: moda, media, mediana, desvio padrão 
//7- Pensar em como será feito as medidas separatrizes

function trataInput(){
    let valor = document.getElementById("inputValores").value
    
    if(valor == ''){
        alert("Erro: insira dados válidos");
    }else{
        let sheetParamters = valor.split(';');
        let countElements = {};
        
        sheetParamters.sort((a,b) => a-b); //←QuickSort→
        sheetParamters.forEach(function(i){
            countElements[i] = (countElements[i]||0)+1;
        });

        let maiorNumero = sheetParamters.length - 1;
        let menorNumero = sheetParamters[0];
        let totaldeIndicesVetor = sheetParamters.length;
        let media = sheetParamters.map(Number).reduce((a,b) => a + b)
        return {sheetParamters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements, media};
    }
}

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

function extraiObj(obj){
    this.frequencia = []
    for(let i in obj){
        frequencia.push(obj[i]);
        
    }
    return frequencia;
}
//Verificar a lógica da função
function mediana(vetor){
    if(vetor.length % 2 == 0){
        let posicao1 = (vetor.length -1) / 2
        let posicao2 = posicao1 + 1
        return vetor[Math.ceil((posicao1 + posicao2)/2)]
    }else{
        return vetor[Math.ceil((vetor.length - 1) % 2)] / 2
    }
}

function criaGrafico(){
    let ctx = document.getElementById('grafico').getContext('2d');
    Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(113,89,193, 0.8)';
    Chart.defaults.global.elements.rectangle.borderColor = 'rgba(113,89,193, 1)';
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.title = true
    var grafico = new Chart(ctx,{
        type: 'bar',
        data: {
            labels: Object.keys(trataInput().countElements),
            datasets: [{
                data: extraiObj(trataInput().countElements),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    stacked: false
                }
            }],
            xAxes: [{
                gridLines: {
                    offsetGridLines: true,
                    stacked: false
                }
            }]
        }
    }
});


};

function criaGraficodePizza(){
    let ctx = document.getElementById('grafico').getContext('2d');
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.title = true
    var grafico = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: Object.keys(trataInput().countElements),
            datasets: [{
                data: extraiObj(trataInput().countElements),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
});

    
};


function execRender(){
    var tipoVariavel = document.getElementById('variaveis').value
    if(tipoVariavel === ''){
           
        alert('Erro: Selecione o tipo de variavel')
    }else if(tipoVariavel !== 'qualitativa'){
        geraTabela();
        criaGrafico();
        console.log(desviopadrao())
    }else{
        geraTabela()
        criaGraficodePizza()
    }
        
}

elButton.onclick = execRender;

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

