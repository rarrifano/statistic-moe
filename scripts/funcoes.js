var elButton = document.querySelector(".box .content .execButton");
var elChart = document.querySelector(".box .content #grafico");

function trataInput(){
    let valor = document.getElementById("inputValores").value;
    let variavel = document.getElementById("variaveis").value;
    if(valor == ''){
        alert("Erro: insira dados válidos");
    }else{
        var sheetParamters = valor.split(';');
        let countElements = {};
        if(variavel == 'qualitativaOrdinal' || variavel == 'qualitativaNominal'){
            
            sheetParamters.sort(); //QuickSort
            sheetParamters.forEach(function(i){
            countElements[i] = (countElements[i]||0)+1;
        });
            let maiorNumero = sheetParamters[sheetParamters.length - 1];
            let menorNumero = sheetParamters[0];
            let totaldeIndicesVetor = sheetParamters.length;
            return {sheetParamters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements};

        }else{
            var sheetParamters = sheetParamters.map(Number);
            sheetParamters.sort((a,b) => a-b); //QuickSort
            sheetParamters.forEach(function(i){
            countElements[i] = (countElements[i]||0)+1;
        });
            let maiorNumero = sheetParamters[sheetParamters.length - 1];
            let menorNumero = sheetParamters[0];
            let totaldeIndicesVetor = sheetParamters.length;
            let media = (sheetParamters.reduce((a,b) => a + b)/totaldeIndicesVetor).toFixed(2)
            return {sheetParamters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements,media};
        }
        
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
    tabela.style.border = '1px solid #606060';
    let colunaTitulo = document.getElementById('inputTitulo').value || "Variável";
    let cabecalho = [colunaTitulo,'Fi', 'Fr%', 'Fac', 'Fac%'];
    let coluna1 = Object.keys(trataInput().countElements);
    let frequenciaSimples = extraiObj(trataInput().countElements);
    let frequenciaAcumulada = [];
    let linha = [];
    let acumulador = 0;
    let frequenciaPercent = [];
    let frequenciaPerAcu = [];
    
    for(i in frequenciaSimples){
        frequenciaPercent.push(((frequenciaSimples[i]/trataInput().totaldeIndicesVetor) * 100).toFixed(2)+"%")
        if(i == 0){
            acumulador = acumulador + frequenciaSimples[i]
            frequenciaAcumulada.push(acumulador)
            frequenciaPerAcu.push((acumulador/trataInput().totaldeIndicesVetor *100).toFixed(2)+"%")
            
        }else{
            acumulador = acumulador + frequenciaSimples[i]
            frequenciaAcumulada.push(acumulador)
            frequenciaPerAcu.push((acumulador/trataInput().totaldeIndicesVetor *100).toFixed(2)+"%")
        }
    }
    
    for(let i = 0; i < coluna1.length ; i++){    
        linha.push({elementos:coluna1[i], 
        frequenciaSimples: frequenciaSimples[i],
        frequenciaPercent: frequenciaPercent[i],
        frequenciaAcumulada:frequenciaAcumulada[i],
        frequenciaPerAcu: frequenciaPerAcu[i]
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
function geraTabela2(){
    let tabela2 = document.getElementById('tabela2');
    tabela2.style.border = '1px solid #606060';
    let tituloTabela2 = tabela2.createTHead();
    let linhaTabela2 = tituloTabela2.insertRow();
    let separatriz = document.getElementById("barraMedidas").value
    let chaveSepratriz = document.getElementById("cars").value +": "+ separatriz
    let medidasCentrais = [{
        Média: trataInput().media || "-",
        Moda: moda(),
        Mediana: mediana(trataInput().sheetParamters),
        'Coeficente de variação': desviopadrao().coeficienteVariacao,
        "Desvio Padrão": desviopadrao().desvio,
        
    }];
    if(separatriz!=0){
        medidasCentrais[0][chaveSepratriz] = medidasSeparatrizes()
    }

    for(let i of Object.keys(medidasCentrais[0])){
        let th = document.createElement('th');
        th.setAttribute('class', 'cabecalho');
        let texto = document.createTextNode(i);
        th.appendChild(texto);
        linhaTabela2.appendChild(th);
    }
    for(let i of medidasCentrais){
        let row = tabela2.insertRow();
        for(j in i){
            let celula = row.insertCell();
            let textoLinhas = document.createTextNode(i[j]);
            celula.appendChild(textoLinhas);
            
        }
    }
}   

function geraTabelaQntContinua(){
    let limiteInferior = []
    let limiteSuperior = []
    let parametrosTabela = quantitativaContinua(trataInput().maiorNumero,trataInput().menorNumero,trataInput().totaldeIndicesVetor);
    let aux = trataInput().menorNumero
    let frequenciaQuantContinua = []
    let auxFreq = []
    let numeros = trataInput().sheetParamters
    console.log(parametrosTabela[1])
    for(let i = 0; i < parametrosTabela[0]; i++){
        if(i == 0){
            limiteInferior.push(aux)
            limiteSuperior.push(aux + parametrosTabela[1])  
        }else{ 
            limiteInferior.push(aux)
            limiteSuperior.push(parametrosTabela[1]+limiteInferior[i])
        }
        aux += parametrosTabela[1]
    }
    console.log('Limite Inferior: ' + limiteInferior)
    console.log('Limite Superior: ' + limiteSuperior)
    for(i in limiteSuperior){
        auxFreq = numeros.filter(n => n >= limiteInferior[i] && n <= limiteSuperior[i])
        frequenciaQuantContinua.push(auxFreq.length)
    }
    let pontoMedio = limiteInferior.map((n,idx) =>(limiteInferior[idx]+limiteSuperior[idx]/2))
    console.log(pontoMedio)
    let tabela = document.getElementById('tabela');
    let titulos = tabela.createTHead();    
    let linhas = titulos.insertRow();
    tabela.style.border = '1px solid #606060';
    let colunaTitulo = document.getElementById('inputTitulo').value || "Variável";
    let frequenciaAcumulada = [];
    let linha = [];
    let acumulador = 0;
    let frequenciaPercent = [];
    let frequenciaPerAcu = [];
    
    for(i in frequenciaQuantContinua){
        frequenciaPercent.push(((frequenciaQuantContinua[i]/trataInput().totaldeIndicesVetor) * 100).toFixed(2)+"%")
        if(i == 0){
            acumulador = acumulador + frequenciaQuantContinua[i]
            frequenciaAcumulada.push(acumulador)
            frequenciaPerAcu.push((acumulador/trataInput().totaldeIndicesVetor *100).toFixed(2)+"%")
            
        }else{
            acumulador = acumulador + frequenciaQuantContinua[i]
            frequenciaAcumulada.push(acumulador)
            frequenciaPerAcu.push((acumulador/trataInput().totaldeIndicesVetor *100).toFixed(2)+"%")
        }
    }
    
    let cabecalho = [colunaTitulo,'Fi', 'Fr%', 'Fac', 'Fac%'];

    for(let i = 0; i < parametrosTabela[0]; i++){    
        linha.push({elementos:`${limiteInferior[i]} |-- ${limiteSuperior[i]}`, 
        frequenciaSimples: frequenciaQuantContinua[i],
        frequenciaPercent: frequenciaPercent[i],
        frequenciaAcumulada:frequenciaAcumulada[i],
        frequenciaPerAcu: frequenciaPerAcu[i]
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
    
    if(tipoVariavel === ''){       
        alert('Erro: Selecione o tipo de variavel');
    }else if(tipoVariavel == 'quantitativaContinua'){
        criaGraficoHisto();
        geraTabelaQntContinua();
        geraTabela2();
        desviopadrao();
    }
    else if(tipoVariavel !== 'qualitativaOrdinal' && tipoVariavel !== 'qualitativaNominal'){
        criaGrafico();
        geraTabela();
        geraTabela2();
        desviopadrao();
    }else{
        criaGraficoPizza();
        geraTabela();
        geraTabela2();
        desviopadrao();
    }       
}

elButton.onclick = execRender;

function mudaBarra(){
    let barra = document.getElementById("barraMedidas")
    let barraValor = document.getElementById("cars").value

    if (barraValor == "Percentil") {
        barra.min = 1
        barra.max = 100
        barra.step = 1
        barra.value = 1
    } else if (barraValor == "Decil") {
        barra.min = 10
        barra.max = 100
        barra.step = 10
        barra.value = 10
    } else if (barraValor == "Quintil") {
        barra.min = 20
        barra.max = 100
        barra.step = 20
        barra.value = 20
    } else if (barraValor == "Quartil") {
        barra.min = 25
        barra.max = 100
        barra.step = 25
        barra.value = 25
    }
}

function barraBMS() {
    //Funcionamento da barra da medida separatriz
    var slider = document.getElementById("barraMedidas")
    var vbms = document.getElementById("valorBMS")
    vbms.innerHTML = `${slider.value}%`; // Mostra o valor inicial

    // Atualiza o valor conforme o usuário seleciona o valor da barra
    slider.oninput = function () {
        vbms.innerHTML = `${slider.value}%`
    }
}