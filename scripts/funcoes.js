var elButton = document.querySelector(".box .content .execButton");
var elChart = document.querySelector(".box .content #grafico");

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

function tituloTabela(funcao){
    let obj = {}
    return obj
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
                label: document.getElementById('inputTitulo').value,
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
    /*Aqui vai a função pra chamar a tabela*/ 
    document.getElementById('inputValores').value = '';
    document.getElementById('inputTitulo').value = '';
};

function criaGraficodePizza(){
    console.log("pizza")
    let ctx = document.getElementById('grafico').getContext('2d');
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.title = true
    var grafico = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: Object.keys(trataInput().countElements),
            datasets: [{
                label: document.getElementById('inputTitulo').value,
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
    /*Aqui vai a função pra chamar a tabela*/ 
    document.getElementById('inputValores').value = '';
    document.getElementById('inputTitulo').value = '';
};


function execRender(){
    var tipoVariavel = document.getElementById('variaveis').value
    if(tipoVariavel === ''){
        alert('Erro: Selecione o tipo de variavel')
    }else if(tipoVariavel !== 'qualitativa'){
        criaGrafico();
    }else{
        criaGraficodePizza()
    }
        
}

elButton.onclick = execRender;

function geraTabela(dados){
    let tabela = document.getElementById('tabela');
    let titulos = tabela.createTHead();    
    let linhas = titulos.insertRow();

    for(let chaves of Object.keys(dados[0])){
        let th = document.createElement('th');
        let texto = document.createTextNode(chaves);
        th.appendChild(texto);
        linhas.appendChild(th);
    }

    for(let elemento of dados){
        let linhaTabela = tabela.insertRow();
        for(chave in elemento){
            let celula = linhaTabela.insertCell();
            let textoLinhas = document.createTextNode(elemento[chave]);
            celula.appendChild(textoLinhas);
        }
    }
}
