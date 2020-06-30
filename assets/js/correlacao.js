function separaDados(){
    let nomeVariavelX = document.getElementById('variavelX').value || "X";
    let nomerVariavelY = document.getElementById('variavelY').value || "Y";
    let elementosX = document.getElementById('xData').value
    let elementosY = document.getElementById('yData').value
    let listaElementosX = elementosX.split(';');
    let listaElementosY = elementosY.split(';');
    let observacoes = listaElementosX.length;
    let somatorioX = listaElementosX.map(Number).reduce((a,b) => a+b);
    let somatorioY = listaElementosY.map(Number).reduce((a,b) => a+b);
    let somatorioXelevado = listaElementosX.map(a => a * a).reduce((a,b) => a+b);
    let somatorioYelevado = listaElementosY.map(a => a * a).reduce((a,b) => a+b);
    let somatorioXvsY = [];
    for(let i in listaElementosY){
        somatorioXvsY.push(listaElementosX[i] * listaElementosY[i]);
        
    }
    somatorioXvsY = somatorioXvsY.reduce((a,b) => a+b);
    return{nomeVariavelX, nomerVariavelY, listaElementosX, listaElementosY, observacoes, somatorioX, 
           somatorioY, somatorioXelevado, somatorioYelevado, somatorioXvsY}
}

function correlacaoRegressao(){
    let correlacaoLinha1 = (separaDados().observacoes *separaDados().somatorioXvsY) - ((separaDados().somatorioX)*(separaDados().somatorioY))
    let correlacaoLinha2 = Math.sqrt(((separaDados().observacoes *separaDados().somatorioXelevado) - Math.pow(separaDados().somatorioX,2)) * ((separaDados().observacoes *separaDados().somatorioYelevado) - Math.pow(separaDados().somatorioY,2)))
    let correlacao = correlacaoLinha1/correlacaoLinha2
    
    let escrever = document.getElementById("resultado")

    let variavelA = ((separaDados().somatorioX * separaDados().somatorioY) - (separaDados().observacoes *separaDados().somatorioXvsY))/(Math.pow(separaDados().somatorioX,2) - (separaDados().observacoes * separaDados().somatorioXelevado))
    let variavelB = ((separaDados().somatorioXvsY *separaDados().somatorioX) - (separaDados().somatorioXelevado *separaDados().somatorioY))/(Math.pow(separaDados().somatorioX,2) - (separaDados().observacoes *separaDados().somatorioXelevado))
    escrever.innerHTML += `<p>Correlação: ${correlacao.toFixed(2)}</p>`
    escrever.innerHTML += `<p>Formula de Regressão</p><p>Y = ${variavelA.toFixed(4)}X + ${variavelB.toFixed(4)}  `
    escrever.innerHTML += `<div class=""grid-item><input type="text" class="form-control" id="varX" placeholder="Insira um valor para X" style="display: inline-block">
                           <input type="text" class="form-control" id="varY" placeholder="Insira um valor para Y" style="display: inline-block"></div>`
}

function criaObj(){
    let dados = []
    let varx = separaDados().listaElementosX
    let varY = separaDados().listaElementosY
    for(let i = 0; i < separaDados().listaElementosX.length; i++){
        dados.push({x: varx[i], y:varY[i]} )
    }
    console.log(dados)
    return dados
}

function geraGraficoDispercao(){
    let ctx = document.getElementById('graficoRegressao').getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
        datasets: [{
            label: `${separaDados().nomeVariavelX} em função de ${separaDados().nomerVariavelY}`,
            data: criaObj(),
        }]
    },
    options: {
        responsive: true
   }
});
}

function exec(){
    correlacaoRegressao()
    geraGraficoDispercao()
}

function apagar() {
    modal = document.querySelector("#resultado");
    modal.innerHTML = "";
};