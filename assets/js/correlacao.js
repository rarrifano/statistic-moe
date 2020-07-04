function separaDados(){
    
    let nomeVariavelX = document.getElementById('variavelX').value || "X";
    let nomerVariavelY = document.getElementById('variavelY').value || "Y";
    let elementosX = document.getElementById('xData').value;
    let elementosY = document.getElementById('yData').value;
    let input = document.getElementById("importArchive").value;
    let botao = document.getElementById("calcularRegressao");
    if(nomeVariavelX == "" || nomerVariavelY == ""|| elementosY == "" || elementosX == "" || input == ""){
        alert("Erro: insira dados válidos ou importe um arquivo");
        botao.setAttribute("data-target", "");
        apagar();

    }else{
        botao.setAttribute("data-target", "#staticBackdrop");
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
    
}

function correlacaoRegressao(){
    let correlacaoLinha1 = (separaDados().observacoes *separaDados().somatorioXvsY) - ((separaDados().somatorioX)*(separaDados().somatorioY))
    let correlacaoLinha2 = Math.sqrt(((separaDados().observacoes *separaDados().somatorioXelevado) - Math.pow(separaDados().somatorioX,2)) * ((separaDados().observacoes *separaDados().somatorioYelevado) - Math.pow(separaDados().somatorioY,2)))
    let correlacao = correlacaoLinha1/correlacaoLinha2
    
    

    let variavelA = ((separaDados().somatorioX * separaDados().somatorioY) - (separaDados().observacoes *separaDados().somatorioXvsY))/(Math.pow(separaDados().somatorioX,2) - (separaDados().observacoes * separaDados().somatorioXelevado))
    let variavelB = ((separaDados().somatorioXvsY *separaDados().somatorioX) - (separaDados().somatorioXelevado *separaDados().somatorioY))/(Math.pow(separaDados().somatorioX,2) - (separaDados().observacoes *separaDados().somatorioXelevado))
    
    return {variavelA, variavelB, correlacao}
}
function escreveResultados(){
    let escrever = document.getElementById("resultado")
    escrever.innerHTML += `<p>Correlação: ${correlacaoRegressao().correlacao.toFixed(2)}</p>`
    escrever.innerHTML += `<p>Formula de Regressão</p><p>Y = ${correlacaoRegressao().variavelA.toFixed(4)}X + ${correlacaoRegressao().variavelB.toFixed(4)}  `
    escrever.innerHTML += `<div class=""grid-item><input type="text" onclick="apagarTxt()" onkeypress="formulaRegressao()" class="form-control" id="varX" placeholder="Insira um valor para X" style="margin: auto;">
                           <input type="text" onkeypress="formulaRegressao()" onclick="apagarTxt()" class="form-control" id="varY" placeholder="Insira um valor para Y" style="margin: auto;"></div>`
}

function criaObj(){
    let dados = []
    let varx = separaDados().listaElementosX
    let varY = separaDados().listaElementosY
    for(let i = 0; i < separaDados().listaElementosX.length; i++){
        dados.push({x: varx[i], y:varY[i]})
    }
    console.log(dados)
    return dados
}

function geraGraficoDispercao(){
    let elTabela = document.createElement("canvas");
    elTabela.setAttribute("id", "graficoRegressao");
    let resultado = document.getElementById("resultado")
    resultado.appendChild(elTabela)
    let ctx = document.getElementById('graficoRegressao').getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
        datasets: [{
            label: `${separaDados().nomeVariavelX} em função de ${separaDados().nomerVariavelY}`,
            data: criaObj(),
            backgroundColor: 'rgba(113,89,193, 0.8)',
            borderColor: 'rgba(113,89,193, 1)'
        }]
    },
    options: {
        responsive: true
   }
});
scatterChart.update()
}

function exec(){
    correlacaoRegressao()
    escreveResultados()
    geraGraficoDispercao()
}

function apagar() {
    modal = document.querySelector("#resultado");
    modal.innerHTML = "";
};

function apagarTxt() {
    document.querySelector("#varX").value = ""
    document.querySelector("#varY").value = ""
}

function formulaRegressao() {
    
    let y;
    let x;
    if (document.getElementById('varX').value != "") {
        x = Number(document.getElementById('varX').value);
        y = correlacaoRegressao().variavelA * x + correlacaoRegressao().variavelB;
        
        document.getElementById('varY').value = y.toFixed(2);
    } else if (document.getElementById('varY').value != "") {
        y = Number(document.getElementById('varY').value);
        x = (correlacaoRegressao().variavelB - y)/-correlacaoRegressao().variavelA;
        document.getElementById('varX').value = x.toFixed(2);
    }
    
}

const input = document.getElementById('importArchive')
input.addEventListener('change', () => {
  readXlsxFile(input.files[0]).then((data) => {
    // `data` is an array of rows
    // each row being an array of cells.
    document.getElementById("variavelX").value = ""
    document.getElementById("variavelY").value = ""
    document.getElementById("xData").value = ""
    document.getElementById("yData").value = ""
    document.getElementById("variavelX").value = data[0][0]
    document.getElementById("variavelY").value = data[0][1]
    for(let i = 1; i < data.length; i++){ 
        if(i == data.length-1){
            document.getElementById("xData").value += `${data[i][0]}`
            break
        }
        document.getElementById("xData").value += `${data[i][0]};`
    }
    for(let i = 1; i < data.length; i++){
        
        if(i == data.length-1){
            document.getElementById("yData").value += `${data[i][1]}`
            break
        }
        document.getElementById("yData").value += `${data[i][1]};`
    }
  })
})


