function trataInput(){
    let valor = document.getElementById("input2").value
    if(valor == ''){
        alert("[ERRO] Favor Informar os dados")
    }else{    
    let sheetParamters = []
    sheetParamters.push(valor.split(';'))
    let realSheetParameters = sheetParamters
    realSheetParameters[0].sort((a,b) => a-b)
    console.log('Organizado: ' + realSheetParameters[0])
    var countElements = {}
    realSheetParameters[0].forEach(function(i){ countElements[i] = (countElements[i]||0)+1})
    let maiorNumero = realSheetParameters[0][realSheetParameters[0].length - 1]
    console.log("Maior: " + maiorNumero)
    let menorNumero = realSheetParameters[0][0]
    console.log("Menor: "+ menorNumero)
    let totaldeIndicesVetor = realSheetParameters[0].length
    console.log("Total: " + totaldeIndicesVetor)
    return {realSheetParameters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements}
    }
    
}

//Function what returns a number of lines and the number of colomns of a tabulation 
const quantitativaContinua = function(max, min, totalElem){
    let amplitude = max - min //calcula a amplitude da serie
    let classeLinha = Number(Math.sqrt(totalElem).toFixed(0)) 
    let classeLinhaMaisUm = classeLinha + 1
    let classeLinhaMenosUm = classeLinha - 1
    let resto = 1
    while(resto == 1){
        if(amplitude % classeLinhaMenosUm != 0 && amplitude % classeLinhaMaisUm != 0 && amplitude % classeLinhaMenosUm != 0){
            amplitude ++
        }else if(amplitude % classeLinhaMaisUm == 0){
            let resultado = amplitude / classeLinhaMaisUm
            resto = 0
            this.formatoTabela = [classeLinhaMaisUm, resultado]
        }else if(amplitude % classeLinhaMenosUm == 0){
            let resultado = amplitude / classeLinhaMenosUm
            resto = 0
            this.formatoTabela = [classeLinhaMenosUm, resultado]
        }else if(amplitude % classeLinha == 0){
            let resultado = amplitude/classeLinha
            resto = 0
            this.formatoTabela = [classeLinha, resultado]
        } 
    }
        return formatoTabela
}


function extraiobj(a){
    this.frequencia = []
    for(let i in a){
        frequencia.push(a[i])
        
    }
    return frequencia
}



function criaGrafico(){
    let ctx = document.getElementById('grafico').getContext('2d')
    Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(113,89,193, 0.8)'
    Chart.defaults.global.elements.rectangle.borderColor = 'rgba(113,89,193, 1)'
    var grafico = new Chart(ctx,{
        type: 'bar',
    data: {
        labels: Object.keys(trataInput().countElements),
        datasets: [{
            label: document.getElementById('input').value,
            data: extraiobj(trataInput().countElements) ,
            /*backgroundColor: [
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
            ],*/
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
})
    document.getElementById('input2').value = ''
}
