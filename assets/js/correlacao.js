function correlacaoRegressao(){
    let nomeVariavelX = document.getElementById('variavelX');
    let nomerVariavelY = document.getElementById('variavelY');
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

    let correlacaoLinha1 = (observacoes * somatorioXvsY) - ((somatorioX)*(somatorioY))
    let correlacaoLinha2 = Math.sqrt(((observacoes * somatorioXelevado) - Math.pow(somatorioX,2)) * ((observacoes * somatorioYelevado) - Math.pow(somatorioY,2)))
    let correlacao = correlacaoLinha1/correlacaoLinha2
    
    let escrever = document.getElementById("resultado")
    if(correlacao == 0){
        alert("Variaveis Não relacionadas")
    }else if(correlacao <= 0.1 && correlacao < 0.3 || correlacao <= -0.1 && correlacao < -0.3){
        alert("Correlação Fraca")
    }else if(correlacao > 0.3 && correlacao < 0.7 || correlacao > -0.3 && correlacao < -0.7){
        alert("Correlação Media")
    }else if(correlacao > 0.7 && correlacao < 1 || correlacao > -0.7 && correlacao < -1){
        let variavelA = ((somatorioX * somatorioY) - (observacoes * somatorioXvsY))/(Math.pow(somatorioX,2) - (observacoes * somatorioXelevado))
        let variavelB = ((somatorioXvsY * somatorioX) - (somatorioXelevado * somatorioY))/(Math.pow(somatorioX,2) - (observacoes * somatorioXelevado))
        escrever.innerHTML += `<p>Correlação: ${correlacao.toFixed(2)}</p>`
        escrever.innerHTML += `<p>Formuala de Regressão</p><p>Y = ${variavelA.toFixed(4)}X + ${variavelB.toFixed(4)}  `
    }
}