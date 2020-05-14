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
        return {sheetParamters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements};
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

function criaGrafico(){
    let ctx = document.getElementById('grafico').getContext('2d');
    Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(113,89,193, 0.8)';
    Chart.defaults.global.elements.rectangle.borderColor = 'rgba(113,89,193, 1)';
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
                    beginAtZero: true
                }
            }]
        }
    }
});
    geraTabela(mountains)
    document.getElementById('inputValores').value = '';
    document.getElementById('inputTitulo').value = '';
};

function execRender(){
    criaGrafico();
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
